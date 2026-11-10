const { test } = require('@playwright/test')

test.setTimeout(60 * 60 * 1000)

const monitoring =
    require('../services/monitoring/monitoring')

test(
    'Monitoring SIAPP',
    async () => {

        const sekarang =
            new Date()

        const bulan =
            String(
                sekarang.getMonth() + 1
            ).padStart(2, '0')

        const tahun =
            String(
                sekarang.getFullYear()
            )

        await monitoring(
            bulan,
            tahun
        )

    }
)