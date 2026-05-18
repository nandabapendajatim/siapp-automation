const { test } = require('@playwright/test')

const db = require('../database/db')

test.use({
  browserName: 'chromium'
})

test('Entry semua data pending', async ({ page }) => {

  // =========================
  // LOGIN
  // =========================

  await page.goto('https://siapp.dipendajatim.go.id')

  await page.waitForTimeout(3000)

  // isi login
  await page.fill('input[name="kdsamsat"]', '831')

  await page.fill('input[name="nip"]', '199301072025041005')

  await page.fill('input[name="password"]', 'BANGKALAN')

  // klik login
  await page.getByRole('button', { name: /login/i }).click()

  // tunggu login selesai
  await page.waitForTimeout(5000)

  // =========================
  // AMBIL SEMUA DATA PENDING
  // =========================

  const datas = db.prepare(`
    SELECT *
    FROM sk_data
    WHERE status_proses = 'pending'
  `).all()

  // =========================
  // VALIDASI DATA
  // =========================

  if (datas.length === 0) {

    console.log('Tidak ada data pending')

    return

  }

  console.log('=========================')
  console.log('TOTAL DATA PENDING:', datas.length)
  console.log('=========================')

  // =========================
  // LOOP SEMUA DATA
  // =========================

  for (const data of datas) {

    console.log('')
    console.log('=========================')
    console.log('PROSES DATA')
    console.log('=========================')

    console.log('No Entri:', data.no_entri)
    console.log('Jenis Surat:', data.jenis_surat)

    let url = ''
    let payload = {}

    // =========================
    // TENTUKAN ENDPOINT
    // =========================

    if (data.jenis_surat === 'SPOS') {

      url = 'https://siapp.dipendajatim.go.id/proses/saveSPOS.php'

      payload = {
        nspos: data.no_entri
      }

    } else if (data.jenis_surat === 'NPP') {

      url = 'https://siapp.dipendajatim.go.id/proses/saveNPP.php'

      payload = {
        nonpp: data.no_entri
      }

    } else if (data.jenis_surat === 'NTP') {

      url = 'https://siapp.dipendajatim.go.id/proses/saveNTP.php'

      payload = {
        nontp: data.no_entri
      }

    }

    // =========================
    // REQUEST ENTRY
    // =========================

    try {

      const response = await page.request.post(url, {
        form: payload
      })

      const result = await response.text()

      console.log('Response SIAPP:', result)

      // =========================
      // HANDLE RESPONSE
      // =========================

      let statusProses = 'failed'

      if (result.trim() === '1') {

        statusProses = 'success'

      } else if (result.trim() === '4') {

        statusProses = 'not_found'

      } else {

        statusProses = 'duplicate'

      }

      // =========================
      // UPDATE DATABASE
      // =========================

      db.prepare(`
        UPDATE sk_data
        SET
          status_proses = ?,
          response_siapp = ?,
          processed_at = datetime('now')
        WHERE id = ?
      `).run(
        statusProses,
        result,
        data.id
      )

      console.log('STATUS:', statusProses)

    } catch (err) {

      console.log('ERROR:', err.message)

      // update database gagal
      db.prepare(`
        UPDATE sk_data
        SET
          status_proses = 'failed',
          response_siapp = ?
        WHERE id = ?
      `).run(
        err.message,
        data.id
      )

    }

    // =========================
    // DELAY 1 DETIK
    // =========================

    await page.waitForTimeout(1000)

  }

  console.log('')
  console.log('=========================')
  console.log('SELESAI SEMUA PROCESS')
  console.log('=========================')

  await page.waitForTimeout(5000)

})