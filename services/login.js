async function login(page, account) {

  console.log('=========================')
  console.log('LOGIN:', account.nama)
  console.log('=========================')

  await page.goto(
    'https://siapp.dipendajatim.go.id',
    {
      waitUntil: 'networkidle'
    }
  )

  // isi kode samsat
  await page.fill(
    'input[name="kdsamsat"]',
    account.kdsamsat
  )

  // isi nip
  await page.fill(
    'input[name="nip"]',
    account.nip
  )

  // isi password
  await page.fill(
    'input[name="password"]',
    account.password
  )

  // klik login
  await page.getByRole('button', { name: /login/i }).click()

  // tunggu login selesai
  await page.waitForLoadState(
    'networkidle'
  )

  console.log('LOGIN BERHASIL')

}

module.exports = login