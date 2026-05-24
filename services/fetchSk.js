const cheerio = require('cheerio')

const db = require('../database/db')

const {
  nowJakarta
} = require('../services/utils/date')

// =========================
// CEK MOTOR / MOBIL
// =========================

function isMotor(nopol) {

  // ambil angka dari nopol
  const angka = nopol.match(/\d+/)

  // kalau tidak ada angka
  if (!angka) {
    return false
  }

  // ambil digit pertama
  const firstDigit = angka[0][0]

  // motor = 2-6
  return ['2', '3', '4', '5', '6']
    .includes(firstDigit)

}

// =========================
// FETCH SK
// =========================

async function fetchSk(page, batchId) {

  console.log('=========================')
  console.log('FETCH DATA SK')
  console.log('=========================')

  console.log('')
  console.log('BATCH ID:', batchId)

  // =========================
  // LIST JENIS SURAT
  // =========================

  const jenisSuratList = [
    'SPOS',
    'NPP',
    'NTP',
    'ETULNTP'
  ]

  // =========================
  // LOOP FETCH
  // =========================

  for (const jenisSurat of jenisSuratList) {

    console.log('')
    console.log('FETCH:', jenisSurat)

    const response = await page.request.post(
      'https://siapp.dipendajatim.go.id/view/vbEntri.php',
      {
        form: {
          tgcetak: '01/05/2026',
          tgcetak2: '31/05/2026',
          jns_surat: jenisSurat,
          status: '1'
        }
      }
    )

    const html = await response.text()

    // =========================
    // PARSING HTML
    // =========================

    const $ = cheerio.load(html)

    const rows = $('table tr')

    console.log('Jumlah row:', rows.length)

    // =========================
    // LOOP ROW
    // =========================

    rows.each((index, row) => {

      // skip header
      if (index === 0) return

      const cols = $(row).find('td')

      // validasi kolom
      if (cols.length < 8) return

      // =========================
      // AMBIL DATA
      // =========================

      const no_entri =
        $(cols[1]).text().trim()

      const nopol =
        $(cols[2]).text().trim()

      // =========================
      // FILTER R2 / R3
      // =========================

      if (!isMotor(nopol)) {

        console.log(
          'Skip R4:',
          nopol
        )

        return

      }

      const namaAlamat = $(cols[3])
        .text()
        .trim()
        .split('\n')

      const nama =
        namaAlamat[0]?.trim() || ''

      const desa =
        $(cols[4]).text().trim()

      const kecamatan =
        $(cols[5]).text().trim()

      const potensi =
        $(cols[6]).text().trim()

      const tgl_cetak =
        $(cols[7]).text().trim()

      // =========================
      // CREATED AT WIB
      // =========================

      const created_at =
        nowJakarta()

      // =========================
      // INSERT DATABASE
      // =========================

      try {

        db.prepare(`
          INSERT INTO sk_data (
            no_entri,
            nopol,
            nama,
            desa,
            kecamatan,
            potensi,
            tgl_cetak,
            jenis_surat,
            created_at,
            batch_id
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          no_entri,
          nopol,
          nama,
          desa,
          kecamatan,
          potensi,
          tgl_cetak,
          jenisSurat,
          created_at,
          batchId
        )

        console.log(
          'Insert:',
          jenisSurat,
          '-',
          no_entri,
          '-',
          nopol,
          '- Batch:',
          batchId
        )

      } catch (err) {

        // duplicate data
        if (
          err.message.includes('UNIQUE')
        ) {

          console.log(
            'Skip duplicate:',
            no_entri
          )

        } else {

          console.log(
            'ERROR INSERT:',
            err.message
          )

        }

      }

    })

  }

  console.log('')
  console.log('=========================')
  console.log('FETCH SELESAI')
  console.log('BATCH:', batchId)
  console.log('=========================')

}

module.exports = fetchSk