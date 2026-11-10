const monitoring =
    require('./services/monitoring/monitoring')

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

monitoring(
    bulan,
    tahun
)