const db = require('../database/db')

async function fetchSk(page) {

  console.log('=========================')
  console.log('FETCH DATA SK')
  console.log('=========================')

  const jenisSuratList = ['SPOS', 'NPP', 'NTP']

  for (const jenis of jenisSuratList) {

    console.log('')
    console.log('FETCH:', jenis)

    const response = await page.request.post(
      'https://siapp.dipendajatim.go.id/view/vbEntri.php',
      {
        form: {
          tgcetak: '01/05/2026',
          tgcetak2: '31/05/2026',
          jns_surat: jenis,
          status: '1'
        }
      }
    )

    const html = await response.text()

    // parsing table
    const rows = html.match(/<tr>(.*?)<\/tr>/gs)

    if (!rows) {

      console.log('Tidak ada data')

      continue

    }

    console.log('Jumlah row:', rows.length)

    for (const row of rows) {

      const cols = [...row.matchAll(/<td.*?>(.*?)<\/td>/gs)]
        .map(x => x[1]
        .replace(/<.*?>/g, '')
        .trim())

      if (cols.length < 8) continue

      const no_entri = cols[1]

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
            jenis_surat
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          no_entri,
          cols[2],
          cols[3],
          cols[4],
          cols[5],
          cols[6],
          cols[7],
          jenis
        )

        console.log('Insert:', no_entri)

      } catch (err) {

        console.log('Skip duplicate:', no_entri)

      }

    }

  }

  console.log('')
  console.log('FETCH SELESAI')

}

module.exports = fetchSk