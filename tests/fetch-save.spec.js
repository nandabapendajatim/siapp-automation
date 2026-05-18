const { test } = require('@playwright/test')
const cheerio = require('cheerio')

const db = require('../database/db')

test.use({
  browserName: 'chromium'
})

test('Fetch dan simpan semua SK', async ({ page }) => {

  // =========================
  // LOGIN
  // =========================

  await page.goto('https://siapp.dipendajatim.go.id')

  await page.fill('input[name="kdsamsat"]', '831')
  await page.fill('input[name="nip"]', '198011012007011007')
  await page.fill('input[name="password"]', '12320')

  await page.getByRole('button', { name: /login/i }).click()

  await page.waitForTimeout(5000)

  // =========================
  // LIST JENIS SURAT
  // =========================

  const jenisSuratList = ['SPOS', 'NPP', 'NTP']

  // =========================
  // LOOP FETCH DATA
  // =========================

  for (const jenisSurat of jenisSuratList) {

    console.log('=========================')
    console.log('Fetch jenis surat:', jenisSurat)
    console.log('=========================')

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

      // validasi jumlah kolom
      if (cols.length < 8) return

      // =========================
      // AMBIL DATA
      // =========================

      const no_entri = $(cols[1]).text().trim()
      const nopol = $(cols[2]).text().trim()

      const namaAlamat = $(cols[3]).text().trim().split('\n')

      const nama = namaAlamat[0]?.trim() || ''

      const desa = $(cols[4]).text().trim()
      const kecamatan = $(cols[5]).text().trim()
      const potensi = $(cols[6]).text().trim()
      const tgl_cetak = $(cols[7]).text().trim()

      // =========================
      // SIMPAN DATABASE
      // =========================

      try {

        const stmt = db.prepare(`
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
        `)

        stmt.run(
          no_entri,
          nopol,
          nama,
          desa,
          kecamatan,
          potensi,
          tgl_cetak,
          jenisSurat
        )

        console.log('Berhasil simpan:', no_entri)

      } catch (err) {

        console.log('Skip duplicate:', no_entri)

      }

    })

  }

  console.log('=========================')
  console.log('SELESAI FETCH SEMUA DATA')
  console.log('=========================')

  await page.waitForTimeout(5000)

})