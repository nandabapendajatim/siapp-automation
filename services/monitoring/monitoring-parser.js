const cheerio = require('cheerio')

function parseTanggal(str) {

    if (!str || str === '-')
        return null

    const p = str.split('/')

    return new Date(
        Number(p[2]),
        Number(p[1]) - 1,
        Number(p[0])
    )

}

function hitungUmurHari(tglRekam) {

    if (!tglRekam)
        return 0

    const diff =
        Date.now() - tglRekam.getTime()

    return Math.floor(
        diff / 86400000
    )

}

function parseMonitoring(
    html,
    account,
    jenisSurat
) {

    const $ = cheerio.load(html)

    const hasil = []

    $('#example tbody tr').each((i, row) => {

        const td = $(row).find('td')

        if (td.length < 7)
            return

        //----------------------------------------
        // ENTRY + NOPOL
        //----------------------------------------

        const noEntryCell =
            $(td[1]).html()
                .split('<br>')

        const noEntry =
            noEntryCell[0]
                .trim()

        const nopol =
            noEntryCell[1]
                .trim()

        //----------------------------------------
        // NAMA + ALAMAT
        //----------------------------------------

        const namaCell =
            $(td[2]).html()
                .split('<br>')

        const namaWp =
            cheerio.load(
                namaCell[0]
            ).text().trim()

        const alamat =
            cheerio.load(
                namaCell[1] || ''
            ).text().trim()

        const wilayah =
            cheerio.load(
                namaCell[2] || ''
            ).text().trim()

        let kecamatan = ''
        let desa = ''

        const matchWilayah =
            wilayah.match(
                /KEC (.*?) DS (.*)/i
            )

        if (matchWilayah) {

            kecamatan =
                matchWilayah[1].trim()

            desa =
                matchWilayah[2].trim()

        }

        //----------------------------------------
        // KOHIR
        //----------------------------------------

        const kohir =
            $(td[3]).html()
                .split('<br>')

        const kohirPart =
            kohir[0].split('/')

        const noKohir =
            kohirPart[0]

        const tahunKohir =
            kohirPart[1]

        const masaLaku =
            kohir[1]
                .trim()

        //----------------------------------------
        // PKB
        //----------------------------------------

        const pkb =
            Number(
                $(td[4])
                    .text()
                    .replace(/\./g, '')
                    .trim()
            )

        //----------------------------------------
        // TANGGAL
        //----------------------------------------

        const tanggal =
            $(td[5]).html()
                .split('<br>')

        const tglRekam =
            tanggal[0]
                .trim()

        const tglStatus =
            tanggal[1]
                .trim()

        const tglBayar =
            tanggal[2]
                .trim()

        //----------------------------------------
        // STATUS
        //----------------------------------------

        const status =
            $(td[6])
                .text()
                .split('\n')[0]
                .trim()

        //----------------------------------------
        // UMUR
        //----------------------------------------

        const tglRekamDate =
            parseTanggal(
                tglRekam
            )

        const umurHari =
            hitungUmurHari(
                tglRekamDate
            )

        const sisaHari =
            10 - umurHari

        const sudahStatus =
            tglStatus !== '-'

        let kategoriReminder = null

        if (!sudahStatus) {

            if (umurHari === 10)
                kategoriReminder = 10

            else if (umurHari === 9)
                kategoriReminder = 9

            else if (umurHari === 8)
                kategoriReminder = 8

            // else if (umurHari === 7)
            //     kategoriReminder = 7

        }

        const prioritas =
            Math.max(
                umurHari - 6,
                0
            )

        hasil.push({

            pegawai_id:
                account.id,

            pegawai_nama:
                account.nama,

            pegawai_nip:
                account.nip,

            jenis_surat: jenisSurat,

            no_entry: noEntry,

            nopol,

            nama_wp: namaWp,

            alamat,

            kecamatan,

            desa,

            no_kohir: noKohir,

            tahun_kohir: tahunKohir,

            masa_laku: masaLaku,

            pkb,

            tgl_rekam: tglRekam,

            tgl_rekam_date: tglRekamDate,

            tgl_status:
                sudahStatus
                    ? tglStatus
                    : null,

            tgl_bayar:
                tglBayar === '-'
                    ? null
                    : tglBayar,

            status,

            umur_hari: umurHari,

            perlu_reminder: kategoriReminder !== null,
            
            warna_row: $(row).attr('class') || '',

            kategori_reminder: kategoriReminder,
            
            sisa_hari: sisaHari,

            prioritas: prioritas

        })

    })

    return hasil

}

module.exports = {

    parseMonitoring

}