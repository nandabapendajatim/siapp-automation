

const BATAS_PKB_MOBIL = 1000000

function parsePKB(value) {
    if (typeof value === 'number') {
        return Number.isFinite(value) ? value : 0
    }

    const angka = String(value ?? '')
        .replace(/[^\d]/g, '')

    return Number(angka || 0)
}

function isR4(nopol, pkb) {
    const angka = String(nopol || '').match(/\d+/)

    if (!angka) return false

    const digit = angka[0][0]

    // Kategori mobil berdasarkan aturan Automation
    if (['0', '1', '7', '8', '9'].includes(digit)) {
        return true
    }

    // Plat khusus: gunakan PKB sebagai pembeda
    if (['2', '3', '4', '5', '6'].includes(digit)) {
        const nilaiPKB = Number(
            String(pkb || 0).replace(/\./g, '').trim()
        )

        return nilaiPKB > BATAS_PKB_MOBIL
    }

    return false
}

function normalisasiKecamatan(nama) {
    return String(nama || '')
        .trim()
        .replace(/^KEC(?:AMATAN)?\.?\s+/i, '')
        .replace(/\s+/g, ' ')
        .toUpperCase()
}

function olahPemetaan(rows, sekarang = new Date()) {
    const awal = new Date(
        sekarang.getFullYear(),
        sekarang.getMonth(),
        Math.max(1, sekarang.getDate() - 9)
    )

    const akhir = new Date(
        sekarang.getFullYear(),
        sekarang.getMonth(),
        sekarang.getDate()
    )

    const statistik = {
        totalDiambil: rows.length,
        dalamPeriode: 0,
        sudahDL: 0,
        belumDL: 0,
        berhasilDipetakan: 0,
        tidakTeridentifikasi: 0,
        spos: 0,
        npp: 0,
        ntp: 0
    }

    const detail = []
    const pengecualian = []

    for (const row of rows) {
        // Pemetaan hanya kendaraan R4
        if (!isR4(row.nopol, row.pkb)) {
            continue
        }

        const tanggal = row.tgl_rekam_date instanceof Date
            ? row.tgl_rekam_date
            : parseTanggal(row.tgl_rekam)

        if (!tanggal || tanggal < awal || tanggal > akhir) {
            continue
        }

        statistik.dalamPeriode++

        if (row.tgl_status) {
            statistik.sudahDL++
            continue
        }

        statistik.belumDL++

        const jenis = String(row.jenis_surat || '').toUpperCase()

        if (jenis === 'SPOS') statistik.spos++
        if (jenis === 'NPP') statistik.npp++
        if (jenis === 'NTP') statistik.ntp++

        const kecamatan = normalisasiKecamatan(row.kecamatan)

        if (!kecamatan) {
            pengecualian.push({
                ...row,
                alasan: 'Kecamatan tidak ditemukan'
            })
            continue
        }

        detail.push({
            ...row,
            kecamatan,
            pkb: parsePKB(row.pkb)
        })
    }

    statistik.berhasilDipetakan = detail.length
    statistik.tidakTeridentifikasi = pengecualian.length

    const map = new Map()

    for (const row of detail) {
        const key = JSON.stringify([
            row.kecamatan,
            row.pegawai_id
        ])

        if (!map.has(key)) {
            map.set(key, {
                kecamatan: row.kecamatan,
                pegawai_id: row.pegawai_id,
                pegawai_nama: row.pegawai_nama,
                jumlah_sk: 0,
                total_pkb: 0
            })
        }

        const kelompok = map.get(key)

        kelompok.jumlah_sk++
        kelompok.total_pkb += row.pkb
    }

    const perKecamatan = new Map()

    for (const row of detail) {
        if (!perKecamatan.has(row.kecamatan)) {
            perKecamatan.set(row.kecamatan, {
                kecamatan: row.kecamatan,
                jumlah_sk: 0,
                total_pkb: 0
            })
        }

        const kecamatan = perKecamatan.get(row.kecamatan)

        kecamatan.jumlah_sk++
        kecamatan.total_pkb += row.pkb
    }

    return {
        periode: {
            awal: awal.toLocaleDateString('id-ID'),
            akhir: akhir.toLocaleDateString('id-ID')
        },
        statistik,
        kelompok: [...map.values()],
        perKecamatan: [...perKecamatan.values()]
            .sort((a, b) => b.jumlah_sk - a.jumlah_sk),
        detail,
        pengecualian
    }
}

function parseTanggal(value) {
    if (!value) return null

    const match = String(value)
        .trim()
        .match(/^(\d{2})\/(\d{2})\/(\d{4})$/)

    if (!match) return null

    const tanggal = new Date(
        Number(match[3]),
        Number(match[2]) - 1,
        Number(match[1])
    )

    if (
        tanggal.getDate() !== Number(match[1]) ||
        tanggal.getMonth() !== Number(match[2]) - 1 ||
        tanggal.getFullYear() !== Number(match[3])
    ) {
        return null
    }

    return tanggal
}

module.exports = {
    normalisasiKecamatan,
    isR4,
    olahPemetaan
}
