
/* ==========================================
   SIAPP - PEMETAAN DINAS LUAR
========================================== */

let dataPemetaan = null

const angka = value =>
    Number(value || 0).toLocaleString('id-ID')

function el(id) {
    return document.getElementById(id)
}

function setText(id, value) {
    const target = el(id)
    if (target) target.textContent = value
}

function normalisasiKecamatan(nama) {
    let hasil = String(nama || '')
        .trim()
        .toUpperCase()
        .replace(/^KECAMATAN\s+/, '')
        .replace(/^KEC\.?\s+/, '')

    if (hasil === 'SEPULUH') hasil = 'SEPULU'

    return hasil
}

function tambahCell(tr, text) {
    const td = document.createElement('td')
    td.textContent = String(text ?? '-')
    tr.appendChild(td)
    return td
}

function pesanTabel(tbody, text, colspan) {
    tbody.replaceChildren()

    const tr = document.createElement('tr')
    const td = tambahCell(tr, text)

    td.colSpan = colspan
    td.style.textAlign = 'center'

    tbody.appendChild(tr)
}

// ==========================================
// AMBIL DATA DARI API
// ==========================================

async function loadPemetaan() {
    try {
        const response = await fetch(
            '/api/pemetaan-data.php',
            { cache: 'no-store' }
        )

        const result = await response.json()

        if (!response.ok || !result.success) {
            throw new Error(
                result.message || 'Gagal mengambil data'
            )
        }

        if (!result.hasData) {
            setText(
                'statusPemetaan',
                'Belum ada hasil pemetaan'
            )

            setText('totalDiambil', '0')
            setText('totalDipetakan', '0')
            setText('totalPengecualian', '0')
            setText('jumlahSPOS', '0 SK')
            setText('jumlahNPP', '0 SK')
            setText('jumlahNTP', '0 SK')

            pesanTabel(
                el('tabelDetailPemetaan'),
                'Belum ada hasil pemetaan',
                7
            )

            pesanTabel(
                el('tabelPengecualian'),
                'Belum ada data',
                6
            )

            setText('prioritasKecamatanSK', '-')
            setText('prioritasJumlahSK', 'Belum ada data')
            setText('prioritasKecamatanPKB', '-')
            setText('prioritasNominalPKB', 'Belum ada data')
            setText('prioritasTotalPKB', 'Rp0')

            pesanTabel(
                el('tabelPrioritasPemetaan'),
                'Belum ada hasil pemetaan',
                7
            )

            return
        }

        dataPemetaan = result

        tampilkanStatistik(result)
        if (!pemetaanSedangBerjalan) {
            tampilkanTahapan(result)
        }
        tampilkanJenisSurat(result)
        tampilkanRingkasanWilayah(result)
        tampilkanAnalisisPrioritas(result)
        isiFilter(result)
        tampilkanDetail(result.kelompok || [])
        tampilkanPengecualian(
            result.pengecualian || []
        )

    } catch (error) {
        console.error('Error Pemetaan:', error)

        setText(
            'statusPemetaan',
            'Gagal memuat data: ' + error.message
        )
    }
}

// ==========================================
// STATISTIK
// ==========================================

function tampilkanStatistik(data) {
    const s = data.statistik || {}

    setText(
        'totalDiambil',
        angka(s.totalDiambil)
    )

    setText(
        'totalDipetakan',
        angka(s.berhasilDipetakan)
    )

    setText(
        'totalPengecualian',
        angka(s.tidakTeridentifikasi)
    )

    setText(
        'catatanDipetakan',
        `Dari ${angka(s.belumDL)} SK R4 belum DL`
    )

    const jumlahKecamatan = (
        data.perKecamatan || []
    ).length

    setText(
        'catatanWilayah',
        `${jumlahKecamatan} kecamatan teridentifikasi`
    )

    if (data.run) {
        const awal = data.run.periode_awal || '-'
        const akhir = data.run.periode_akhir || '-'

        setText(
            'periodePemetaan',
            `${awal} - ${akhir}`
        )
    }
}

// ==========================================
// TAHAPAN PROSES
// ==========================================

function tampilkanTahapan(data) {
    const s = data.statistik || {}

    setText(
        'stepPengambilan',
        `${angka(s.totalDiambil)} SK diambil`
    )

    setText(
        'stepPenyaringan',
        `${angka(s.belumDL)} SK R4 belum DL`
    )

    setText(
        'stepIdentifikasi',
        `${angka(s.berhasilDipetakan)} SK teridentifikasi`
    )

    const wilayahAktif = (
        data.ringkasanWilayah || []
    ).filter(item =>
        Number(item.jumlah_sk) > 0
    ).length

    setText(
        'stepPengelompokan',
        `${wilayahAktif} wilayah koordinasi`
    )

    setText(
        'stepPenyimpanan',
        'Hasil tersimpan di SQLite'
    )

    setText(
        'statusPemetaan',
        Number(s.tidakTeridentifikasi) > 0
            ? '✓ Berhasil dengan catatan'
            : '✓ Berhasil'
    )

    if (data.run?.finished_at) {
        const tanggal = new Date(
            data.run.finished_at
        )

        const waktu = tanggal.toLocaleString(
            'id-ID',
            {
                timeZone: 'Asia/Jakarta',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }
        )

        setText(
            'terakhirDiproses',
            `Terakhir diproses: ${waktu} WIB`
        )
    }
}

// ==========================================
// JENIS SURAT
// ==========================================

function tampilkanJenisSurat(data) {
    const s = data.statistik || {}

    setText('jumlahSPOS', `${angka(s.spos)} SK`)
    setText('jumlahNPP', `${angka(s.npp)} SK`)
    setText('jumlahNTP', `${angka(s.ntp)} SK`)
}

// ==========================================
// RINGKASAN 4 WILAYAH
// ==========================================

function tampilkanRingkasanWilayah(data) {
    const ringkasan = data.ringkasanWilayah || []

    const cards = document.querySelectorAll(
        '#ringkasanWilayah .wilayah-card'
    )

    const maksimum = Math.max(
        1,
        ...ringkasan.map(item =>
            Number(item.jumlah_sk || 0)
        )
    )

    cards.forEach((card, index) => {
        const nomor = index + 1

        const item = ringkasan.find(row =>
            Number(row.wilayah) === nomor
        )

        const jumlahSK = Number(
            item?.jumlah_sk || 0
        )

        // Jumlah kecamatan berdasarkan master,
        // bukan hanya kecamatan yang memiliki SK.
        const jumlahKecamatan = (
            data.masterWilayah || []
        ).filter(row =>
            Number(row.wilayah) === nomor
        ).length

        const total = card.querySelector(
            '.wilayah-total'
        )

        const caption = card.querySelector(
            '.wilayah-caption'
        )

        const progress = card.querySelector(
            '.wilayah-progress span'
        )

        if (total) {
            total.textContent =
                `${angka(jumlahSK)} SK`
        }

        if (caption) {
            caption.textContent =
                `${jumlahKecamatan} Kecamatan`
        }

        if (progress) {
            progress.style.width =
                `${(jumlahSK / maksimum) * 100}%`
        }
    })
}


/* ==========================================
   ANALISIS PRIORITAS PENAGIHAN
========================================== */

function tampilkanAnalisisPrioritas(data) {
    tutupPegawaiPrioritas()
    const prioritasSK = data.prioritasSK || []
    const prioritasPKB = data.prioritasPKB || []
    const perKecamatan = data.perKecamatan || []

    const formatRupiah = nilai =>
        'Rp' + Number(nilai || 0).toLocaleString('id-ID')

    // Kecamatan dengan jumlah SK terbanyak
    const tertinggiSK = prioritasSK[0]

    setText(
        'prioritasKecamatanSK',
        tertinggiSK?.kecamatan || '-'
    )

    setText(
        'prioritasJumlahSK',
        tertinggiSK
            ? `${angka(tertinggiSK.jumlah_sk)} SK belum DL`
            : 'Belum ada data'
    )

    // Kecamatan dengan nominal PKB terbesar
    const tertinggiPKB = prioritasPKB[0]

    setText(
        'prioritasKecamatanPKB',
        tertinggiPKB?.kecamatan || '-'
    )

    setText(
        'prioritasNominalPKB',
        tertinggiPKB
            ? formatRupiah(tertinggiPKB.total_pkb)
            : 'Belum ada data'
    )

    // Total nominal PKB dari seluruh kecamatan
    const totalPKB = perKecamatan.reduce(
        (total, item) =>
            total + Number(item.total_pkb || 0),
        0
    )

    setText(
        'prioritasTotalPKB',
        formatRupiah(totalPKB)
    )

    // Tabel prioritas berdasarkan jumlah SK
    const tbody = el('tabelPrioritasPemetaan')

    if (!tbody) return

    tbody.replaceChildren()

    const urutan = [...perKecamatan].sort(
        (a, b) =>
            Number(b.jumlah_sk) - Number(a.jumlah_sk)
    )

    if (!urutan.length) {
        pesanTabel(
            tbody,
            'Belum ada data prioritas penagihan',
            6
        )
        return
    }

    urutan.slice(0, 5).forEach((item, index) => {
        const tr = document.createElement('tr')

        tambahCell(tr, index + 1)
        tambahCell(tr, item.kecamatan)

        tambahCell(
            tr,
            item.wilayah
                ? `Wilayah ${item.wilayah}`
                : 'Belum terdaftar'
        )

        tambahCell(tr, angka(item.jumlah_sk))
        tambahCell(tr, formatRupiah(item.total_pkb))
        tambahCell(tr, angka(item.jumlah_pegawai))

        // Tombol melihat pegawai pada kecamatan
        const tdAksi = document.createElement('td')
        const tombol = document.createElement('button')

        tombol.type = 'button'
        tombol.className = 'btn-detail'
        tombol.textContent = 'Lihat Pegawai'

        tombol.addEventListener('click', () => {
            tampilkanPegawaiPrioritas(item.kecamatan)
        })

        tdAksi.appendChild(tombol)
        tr.appendChild(tdAksi)

        tbody.appendChild(tr)
    })
}


/* ==========================================
   DETAIL PEGAWAI KECAMATAN PRIORITAS
========================================== */

function tampilkanPegawaiPrioritas(namaKecamatan) {
    if (!dataPemetaan) return

    const kecamatan = normalisasiKecamatan(namaKecamatan)

    const daftarPegawai = (
        dataPemetaan.kelompok || []
    )
        .filter(row =>
            normalisasiKecamatan(row.kecamatan) === kecamatan
        )
        .sort((a, b) =>
            Number(b.jumlah_sk) - Number(a.jumlah_sk)
        )

    const container = el('detailPegawaiPrioritas')
    const tbody = el('tabelPegawaiPrioritas')

    if (!container || !tbody) return

    tbody.replaceChildren()

    setText(
        'judulDetailPegawaiPrioritas',
        `Detail Pegawai - Kecamatan ${kecamatan}`
    )

    let totalSK = 0
    let totalPKB = 0

    daftarPegawai.forEach((row, index) => {
        const jumlahSK = Number(row.jumlah_sk || 0)
        const nominalPKB = Number(row.total_pkb || 0)

        totalSK += jumlahSK
        totalPKB += nominalPKB

        const tr = document.createElement('tr')

        tambahCell(tr, index + 1)
        tambahCell(tr, row.pegawai_nama)
        tambahCell(tr, angka(jumlahSK))

        tambahCell(
            tr,
            'Rp' + nominalPKB.toLocaleString('id-ID')
        )

        tbody.appendChild(tr)
    })

    if (!daftarPegawai.length) {
        pesanTabel(
            tbody,
            'Tidak ada pegawai pada kecamatan ini',
            4
        )
    }

    setText(
        'catatanPegawaiPrioritas',
        `Total ${angka(totalSK)} SK dengan nominal PKB Rp${totalPKB.toLocaleString('id-ID')} dari ${angka(daftarPegawai.length)} pegawai. Data ini dapat digunakan sebagai bahan koordinasi kegiatan dinas luar bersama.`
    )

    if (!container.open) {
        container.showModal()
    }
}

function tutupPegawaiPrioritas() {
    const modal = el('detailPegawaiPrioritas')

    if (modal?.open) {
        modal.close()
    }
}

// ==========================================
// FILTER
// ==========================================

function isiFilter(data) {
    const wilayah = el('filterWilayah')
    const kecamatan = el('filterKecamatan')
    const pegawai = el('filterPegawai')

    wilayah.replaceChildren(
        new Option('Semua Wilayah', '')
    )

    for (let i = 1; i <= 4; i++) {
        wilayah.add(
            new Option(`Wilayah ${i}`, String(i))
        )
    }

    kecamatan.replaceChildren(
        new Option('Semua Kecamatan', '')
    )

    const daftarKecamatan = [
        ...new Set(
            (data.kelompok || []).map(row =>
                normalisasiKecamatan(row.kecamatan)
            )
        )
    ].filter(Boolean).sort()

    daftarKecamatan.forEach(nama => {
        kecamatan.add(new Option(nama, nama))
    })

    pegawai.replaceChildren(
        new Option('Semua Pegawai', '')
    )

    const daftarPegawai = new Map()

        ; (data.kelompok || []).forEach(row => {
            daftarPegawai.set(
                String(row.pegawai_id),
                row.pegawai_nama
            )
        })

        ;[...daftarPegawai.entries()]
            .sort((a, b) =>
                a[1].localeCompare(b[1])
            )
            .forEach(([id, nama]) => {
                pegawai.add(new Option(nama, id))
            })

    el('btnFilterPemetaan').onclick =
        filterPemetaan

    wilayah.onchange = filterPemetaan
    kecamatan.onchange = filterPemetaan
    pegawai.onchange = filterPemetaan
}

function filterPemetaan() {
    if (!dataPemetaan) return

    const wilayah = el('filterWilayah').value
    const kecamatan = el('filterKecamatan').value
    const pegawai = el('filterPegawai').value

    const hasil = (
        dataPemetaan.kelompok || []
    ).filter(row => {
        const cocokWilayah =
            !wilayah ||
            String(row.wilayah) === wilayah

        const cocokKecamatan =
            !kecamatan ||
            normalisasiKecamatan(row.kecamatan) ===
            kecamatan

        const cocokPegawai =
            !pegawai ||
            String(row.pegawai_id) === pegawai

        return (
            cocokWilayah &&
            cocokKecamatan &&
            cocokPegawai
        )
    })

    tampilkanDetail(hasil)
}

// ==========================================
// TABEL DETAIL PEMETAAN
// ==========================================

function tampilkanDetail(rows) {
    const tbody = el('tabelDetailPemetaan')

    tbody.replaceChildren()

    if (!rows.length) {
        pesanTabel(
            tbody,
            'Tidak ada data sesuai filter',
            7
        )
        return
    }

    const urut = [...rows].sort((a, b) => {
        return (
            Number(a.wilayah || 99) -
            Number(b.wilayah || 99) ||
            String(a.kecamatan).localeCompare(
                String(b.kecamatan)
            ) ||
            String(a.pegawai_nama).localeCompare(
                String(b.pegawai_nama)
            )
        )
    })

    urut.forEach((row, index) => {
        const tr = document.createElement('tr')

        tambahCell(tr, index + 1)

        tambahCell(
            tr,
            row.wilayah
                ? `Wilayah ${row.wilayah}`
                : 'Belum terdaftar'
        )

        tambahCell(
            tr,
            normalisasiKecamatan(row.kecamatan)
        )

        tambahCell(
            tr,
            row.pegawai_nama
        )

        tambahCell(
            tr,
            angka(row.jumlah_sk)
        )

        const status = document.createElement('td')
        const badge = document.createElement('span')

        badge.className = 'badge-status'
        badge.textContent = 'Belum DL'

        status.appendChild(badge)
        tr.appendChild(status)

        // API detail SK individual belum dibuat.
        tambahCell(tr, '—')

        tbody.appendChild(tr)
    })
}

// ==========================================
// TABEL PENGECUALIAN
// ==========================================

function tampilkanPengecualian(rows) {
    const tbody = el('tabelPengecualian')

    setText(
        'jumlahTidakTeridentifikasi',
        `${angka(rows.length)} SK belum dapat dimasukkan ke pemetaan`
    )

    tbody.replaceChildren()

    if (!rows.length) {
        pesanTabel(
            tbody,
            'Semua SK berhasil diidentifikasi',
            6
        )
        return
    }

    rows.forEach((row, index) => {
        const tr = document.createElement('tr')

        tambahCell(tr, index + 1)
        tambahCell(tr, row.no_entry || '-')
        tambahCell(tr, row.jenis_surat || '-')

        // Ditampilkan jika API menyediakan field ini.
        tambahCell(tr, row.nama_wp || '-')
        tambahCell(tr, row.alamat || '-')

        const td = document.createElement('td')
        const badge = document.createElement('span')

        badge.className = 'badge-warning'
        badge.textContent =
            row.alasan || 'Kecamatan tidak ditemukan'

        td.appendChild(badge)
        tr.appendChild(td)

        tbody.appendChild(tr)
    })
}

// ==========================================
// TOMBOL PROSES
// ==========================================


const urutanTahapPemetaan = [
    'pengambilan',
    'penyaringan',
    'identifikasi',
    'pengelompokan',
    'penyimpanan'
]

const idTahapPemetaan = {
    pengambilan: 'stepPengambilan',
    penyaringan: 'stepPenyaringan',
    identifikasi: 'stepIdentifikasi',
    pengelompokan: 'stepPengelompokan',
    penyimpanan: 'stepPenyimpanan'
}

function tampilkanProgressPemetaan(data) {
    const tahap = data.tahap || 'persiapan'
    const tahapAktif = urutanTahapPemetaan.indexOf(tahap)
    const selesai = data.status === 'success'

    const statistik = data.statistik || {}

    const keterangan = {
        pengambilan:
            `${angka(data.pegawai_selesai)} / ${angka(data.pegawai_total)} pegawai selesai`,

        penyaringan:
            statistik.belumDL !== undefined
                ? `${angka(statistik.belumDL)} SK R4 belum DL`
                : `${angka(data.sk_diambil)} SK terkumpul`,

        identifikasi:
            statistik.berhasilDipetakan !== undefined
                ? `${angka(statistik.berhasilDipetakan)} SK teridentifikasi`
                : 'Identifikasi selesai',

        pengelompokan:
            data.jumlah_kelompok !== undefined
                ? `${angka(data.jumlah_kelompok)} kelompok terbentuk`
                : 'Pengelompokan selesai',

        penyimpanan:
            selesai
                ? '✓ Berhasil tersimpan di SQLite'
                : 'Menyimpan hasil ke SQLite...'
    }

    urutanTahapPemetaan.forEach((nama, index) => {
        const id = idTahapPemetaan[nama]
        const elemen = el(id)

        if (!elemen) return

        const step = elemen.closest('.proses-step')
        const nomor = step?.querySelector('.step-number')

        const sudahSelesai = selesai ||
            (tahapAktif >= 0 && index < tahapAktif)

        const sedangAktif =
            !selesai && index === tahapAktif

        if (step) {
            step.classList.toggle(
                'pemetaan-step-selesai',
                sudahSelesai
            )

            step.classList.toggle(
                'pemetaan-step-aktif',
                sedangAktif
            )
        }

        if (nomor) {
            nomor.textContent = sudahSelesai
                ? '✓'
                : sedangAktif
                    ? '⏳'
                    : String(index + 1)
        }

        if (sudahSelesai) {
            elemen.textContent = keterangan[nama]
        } else if (sedangAktif) {
            elemen.textContent = keterangan[nama]
        } else {
            elemen.textContent = 'Menunggu...'
        }
    })

    if (data.status === 'failed') {
        setText(
            'statusPemetaan',
            '❌ ' + (data.pesan || 'Proses gagal')
        )
    } else if (selesai) {
        setText(
            'statusPemetaan',
            '✓ Seluruh tahapan selesai'
        )
    } else {
        setText(
            'statusPemetaan',
            '⏳ ' + (data.pesan || 'Sedang memproses...')
        )
    }
}


let pemetaanSedangBerjalan = false
let intervalStatusPemetaan = null

function setLoadingPemetaan(aktif, pesan = '') {
    const tombol = document.getElementById(
        'btnProsesPemetaan'
    )

    const status = document.getElementById(
        'statusPemetaan'
    )

    if (tombol) {
        tombol.disabled = aktif

        tombol.textContent = aktif
            ? '⏳ Sedang Memproses...'
            : '▶ Mulai Proses Pemetaan'
    }

    if (status && pesan) {
        status.textContent = pesan
    }
}

function hentikanPollingPemetaan() {
    if (intervalStatusPemetaan) {
        clearInterval(intervalStatusPemetaan)
        intervalStatusPemetaan = null
    }
}


let pengecekanStatusAktif = false

async function cekStatusPemetaan() {
    if (pengecekanStatusAktif) return

    pengecekanStatusAktif = true

    try {
        const response = await fetch(
            '/api/pemetaan-status.php',
            { cache: 'no-store' }
        )

        if (!response.ok) {
            throw new Error('Gagal membaca status proses.')
        }

        const data = await response.json()

        if (
            data.status === 'running' &&
            data.tahap !== 'selesai'
        ) {
            pemetaanSedangBerjalan = true

            setLoadingPemetaan(
                true,
                '⏳ ' + (data.pesan || 'Sedang memproses...')
            )

            tampilkanProgressPemetaan(data)
            return
        }

        hentikanPollingPemetaan()

        const sebelumnyaBerjalan = pemetaanSedangBerjalan
        pemetaanSedangBerjalan = false

        if (
            data.status === 'success' ||
            (
                data.status === 'running' &&
                data.tahap === 'selesai'
            )
        ) {
            setLoadingPemetaan(false)

            if (sebelumnyaBerjalan) {
                await loadPemetaan()
            }

            tampilkanProgressPemetaan(data)

        } else if (data.status === 'failed') {
            setLoadingPemetaan(false)
            tampilkanProgressPemetaan(data)

        } else {
            setLoadingPemetaan(false)
        }

    } catch (error) {
        console.error('Status Pemetaan:', error)

        setLoadingPemetaan(
            true,
            '⏳ Menunggu koneksi status proses...'
        )

    } finally {
        pengecekanStatusAktif = false
    }
}

async function runPemetaan() {
    if (pemetaanSedangBerjalan) return

    pemetaanSedangBerjalan = true

    setLoadingPemetaan(
        true,
        '⏳ Menyiapkan proses Pemetaan...'
    )

    tampilkanProgressPemetaan({
        status: 'running',
        tahap: 'persiapan',
        pesan: 'Menyiapkan proses Pemetaan...',
        pegawai_selesai: 0,
        pegawai_total: 0
    })

    try {
        const response = await fetch(
            '/api/pemetaan-run.php',
            { method: 'POST' }
        )

        const result = await response.json()

        if (!response.ok || !result.success) {
            throw new Error(
                result.message || 'Gagal memulai proses.'
            )
        }

        hentikanPollingPemetaan()

        intervalStatusPemetaan = setInterval(
            cekStatusPemetaan,
            2000
        )

        await cekStatusPemetaan()

    } catch (error) {
        console.error('Run Pemetaan:', error)

        pemetaanSedangBerjalan = false
        hentikanPollingPemetaan()

        setLoadingPemetaan(
            false,
            '❌ ' + error.message
        )
    }
}

// Memulihkan loading ketika halaman dibuka ulang
// saat Playwright masih berjalan.


async function initStatusPemetaan() {
    try {
        const response = await fetch(
            '/api/pemetaan-status.php',
            { cache: 'no-store' }
        )

        if (!response.ok) {
            throw new Error('Gagal membaca status')
        }

        const data = await response.json()

        // Hanya aktifkan loading jika status running
        if (
            data.status === 'running' &&
            data.tahap !== 'selesai'
        ) {
            pemetaanSedangBerjalan = true

            setLoadingPemetaan(
                true,
                '⏳ ' + (data.pesan || 'Sedang memproses...')
            )

            tampilkanProgressPemetaan(data)

            hentikanPollingPemetaan()

            intervalStatusPemetaan = setInterval(
                cekStatusPemetaan,
                2000
            )

            return
        }

        // Status selain running tidak boleh mengunci tombol
        pemetaanSedangBerjalan = false
        hentikanPollingPemetaan()

        setLoadingPemetaan(false)

        // Jangan menampilkan error lama setiap kali halaman dibuka.
        // Hasil pemetaan terakhir tetap ditampilkan oleh loadPemetaan().
        if (data.status === 'failed') {
            console.warn(
                'Status worker terakhir:',
                data.pesan
            )
        }

    } catch (error) {
        console.error(
            'Gagal membaca status Pemetaan:',
            error
        )

        pemetaanSedangBerjalan = false
        setLoadingPemetaan(false)
    }
}

if (document.readyState === 'loading') {
    document.addEventListener(
        'DOMContentLoaded',
        initStatusPemetaan
    )
} else {
    initStatusPemetaan()
}


// ==========================================
// INISIALISASI
// ==========================================

if (document.readyState === 'loading') {
    document.addEventListener(
        'DOMContentLoaded',
        loadPemetaan
    )
} else {
    loadPemetaan()
}
