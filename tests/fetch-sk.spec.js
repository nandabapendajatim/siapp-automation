const { test } = require('@playwright/test')

test('Ambil Data SK', async ({ page }) => {

  // buka login
  await page.goto('https://siapp.dipendajatim.go.id')

  // isi login
  await page.fill('input[name="nip"]', 'NIP_ANDA')
  await page.fill('input[name="password"]', 'PASSWORD_ANDA')

  // klik login
  await page.getByRole('button', { name: /login/i }).click()

  // tunggu masuk
  await page.waitForTimeout(5000)

  // request data SK
  const response = await page.request.post(
    'https://siapp.dipendajatim.go.id/view/vbEntri.php',
    {
      form: {
        tgcetak: '01/05/2026',
        tgcetak2: '31/05/2026',
        jns_surat: 'SPOS',
        status: '1'
      }
    }
  )

  const html = await response.text()

  console.log(html)

  await page.waitForTimeout(10000)

})