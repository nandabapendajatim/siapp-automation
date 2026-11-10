const cheerio = require('cheerio')

const db = require('../database/db')

const {
  nowJakarta
} = require('../services/utils/date')

// =========================
// BATAS PKB MOBIL KHUSUS
// =========================

const BATAS_PKB_MOBIL = 1000000

// =========================
// PARSE PKB
// =========================

function parsePKB(pkb) {

  return Number(
    String(pkb)
      .replace(/\./g, '')
      .trim()
  )

}

// =========================
// CEK MOTOR / MOBIL
// =========================

function isMotor(nopol, pkb) {

  // ambil angka dari nopol
  const angka = nopol.match(/\d+/)

  // kalau tidak ada angka
  if (!angka) {
    return false
  }

  // ambil digit pertama
  const firstDigit = angka[0][0]

  // digit awal mobil
  if (['0', '1', '7', '8', '9'].includes(firstDigit)) {
    return false
  }

  // digit awal motor
  if (['2', '3', '4', '5', '6'].includes(firstDigit)) {

    const nilaiPKB =
      parsePKB(pkb)

    // mobil plat khusus
    if (nilaiPKB > BATAS_PKB_MOBIL) {
      return false
    }

    return true

  }

  return false

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
          tgcetak: '01/11/2026',
          tgcetak2: '30/11/2026',
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

      const namaAlamat =
        $(cols[3])
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

      // =========================
      // FILTER R2 / R3
      // =========================

      if (!isMotor(nopol, potensi)) {

        console.log(
          'Skip Mobil:',
          nopol,
          '- PKB:',
          potensi
        )

        return

      }

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

        if (
          err.message.includes('UNIQUE')
        ) {

          console.log(
            'Skip duplicate:',
            no_entri,
            '-',
            jenisSurat
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