
const { test } = require('@playwright/test')

const pemetaan = require('../services/pemetaan/pemetaan')

test.setTimeout(60 * 60 * 1000)

test('Pemetaan Dinas Luar SIAPP', async () => {
    const sekarang = new Date()

    const bulan = String(
        sekarang.getMonth() + 1
    ).padStart(2, '0')

    const tahun = String(
        sekarang.getFullYear()
    )

    await pemetaan(bulan, tahun)
})
