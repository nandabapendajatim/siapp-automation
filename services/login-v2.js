async function login(page, account) {

  console.log('=========================')
  console.log('LOGIN:', account.nama)
  console.log('=========================')

  // console.log('STEP 1')

  await page.goto(
    'https://siapp.dipendajatim.go.id',
    {
      waitUntil: 'networkidle'
    }
  )

  // console.log('STEP 2')

  await page.fill(
    'input[name="kdsamsat"]',
    account.kdsamsat
  )

  // console.log('STEP 3')

  await page.fill(
    'input[name="nip"]',
    account.nip
  )

  // console.log('STEP 4')

  await page.fill(
    'input[name="password"]',
    account.password
  )

  // console.log('STEP 5')

  await page
    .getByRole('button', {
      name: /login/i
    })
    .click()

  // console.log('STEP 6')

  await page.waitForLoadState(
    'networkidle'
  )

  // console.log('STEP 7')

  console.log('LOGIN BERHASIL')

}

module.exports = login