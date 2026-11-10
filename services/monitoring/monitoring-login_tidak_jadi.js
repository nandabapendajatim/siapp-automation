const { chromium } = require('playwright')

async function login(username, password) {

    const browser = await chromium.launch({

        headless: false

    })

    const page = await browser.newPage()

    await page.goto(
        'https://siapp.dipendajatim.go.id/'
    )

    await page.fill(
        'input[name="user"]',
        username
    )

    await page.fill(
        'input[name="pass"]',
        password
    )

    await page.click(
        'button[type="submit"]'
    )

    await page.waitForLoadState(
        'networkidle'
    )

    return {

        browser,
        page

    }

}

module.exports = {

    login

}