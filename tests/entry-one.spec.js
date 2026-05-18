const { test } = require('@playwright/test')

const db = require('../database/db')

test.use({
  browserName: 'chromium'
})

test('Entry 1 data otomatis', async ({ page }) => {

  // =========================
  // LOGIN
  // =========================

  await page.goto('https://siapp.dipendajatim.go.id')

  await page.waitForTimeout(3000)

  await page.fill('input[name="kdsamsat"]', '831')

  await page.fill('input[name="nip"]', '199301072025041005')

  await page.fill('input[name="password"]', 'BANGKALAN')

  await page.getByRole('button', { name: /login/i }).click()

  await page.waitForTimeout(5000)

  // =========================
  // AMBIL 1 DATA PENDING
  // =========================

  const data = db.prepare(`
    SELECT *
    FROM sk_data
    WHERE status_proses = 'pending'
    LIMIT 1
  `).get()

  if (!data) {

    console.log('Tidak ada data pending')

    return

  }

  console.log('=========================')
  console.log('PROSES DATA')
  console.log('=========================')

  console.log('No Entri:', data.no_entri)
  console.log('Jenis Surat:', data.jenis_surat)

  // =========================
  // TENTUKAN ENDPOINT
  // =========================

  let url = ''
  let payload = {}

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

  console.log('=========================')
  console.log('STATUS:', statusProses)
  console.log('=========================')

  await page.waitForTimeout(5000)

})