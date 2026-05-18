const { test } = require('@playwright/test')

test.use({
  browserName: 'chromium'
})

test('Buka SIAPP', async ({ page }) => {

  await page.goto('https://siapp.dipendajatim.go.id')

  await page.waitForTimeout(10000)

})