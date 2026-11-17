
/* ==========================================
   SIAPP AUTOMATION - DASHBOARD
========================================== */

const dashAngka = value =>
    Number(value || 0).toLocaleString('id-ID')

const dashRupiah = value =>
    'Rp' + Number(value || 0).toLocaleString('id-ID')


function dashFormatTanggal(value) {
    if (!value) return '-'

    let tanggal

    // Format ISO dari Node.js:
    // 2026-11-12T08:05:52.612Z
    if (value.includes('T')) {
        tanggal = new Date(value)
    } else {
        // Format SQLite:
        // 2026-11-12 06:52:32
        // Diasumsikan sudah menggunakan waktu Jakarta.
        tanggal = new Date(value.replace(' ', 'T') + '+07:00')
    }

    if (Number.isNaN(tanggal.getTime())) {
        return value
    }

    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
        timeZone: 'Asia/Jakarta'
    }).format(tanggal).replace(' pukul ', ' ')
}


function dashSetText(id, value) {
    const element = document.getElementById(id)

    if (element) {
        element.textContent = value
    }
}

/* ==========================================
   AUTOMATION R2
========================================== */

async function loadDashboardAutomation() {

    try {
        const response = await fetch(
            '/api/dashboard-data.php',
            { cache: 'no-store' }
        )

        const result = await response.json()

        if (!response.ok || !result.success) {
            throw new Error(result.message || 'Gagal mengambil data Automation')
        }

        const data = result.automation || {}

        const monitoring = result.monitoring || {}

        dashSetText(
            'dashMonitoring',
            dashAngka(monitoring.total_sk)
        )

        dashSetText('dashMonitorR2', dashAngka(monitoring.total_sk))

        dashSetText('dashMonitorR4', dashAngka(monitoring.total_reminder))

        dashSetText(
            'dashMonitorUpdate',
            monitoring.terakhir_update
                ? 'Monitoring terakhir: ' + dashFormatTanggal(monitoring.terakhir_update)
                : 'Belum ada data Monitoring'
        )

        dashSetText('dashEntryR2', dashAngka(data.berhasil))
        dashSetText('dashAutoBerhasil', dashAngka(data.berhasil))

        // Gagal mencakup failed dan not_found.
        const gagal =
            Number(data.gagal || 0) +
            Number(data.not_found || 0)

        dashSetText('dashAutoGagal', dashAngka(gagal))

        dashSetText(
            'dashAutoUpdate',
            data.terakhir_update
                ? 'Proses terakhir: ' + dashFormatTanggal(data.terakhir_update)
                : 'Belum ada data proses Automation'
        )

    } catch (error) {
        console.error('Dashboard Automation:', error)
        dashSetText('dashAutoUpdate', 'Gagal memuat data Automation')
    }
}

/* ==========================================
   PEMETAAN DL R4
========================================== */

async function loadDashboardPemetaan() {

    try {
        const response = await fetch(
            '/api/pemetaan-data.php',
            { cache: 'no-store' }
        )

        const result = await response.json()

        if (!response.ok || !result.success) {
            throw new Error(result.message || 'Gagal mengambil data Pemetaan')
        }

        if (!result.hasData) {
            dashSetText('dashBelumDL', '-')
            dashSetText('dashPotensiPKB', '-')
            dashSetText('dashPemetaanSK', '-')
            dashSetText('dashPemetaanKecamatan', '-')
            dashSetText('dashPemetaanUpdate', 'Belum ada hasil pemetaan')
            return
        }

        const statistik = result.statistik || {}
        const perKecamatan = result.perKecamatan || []

        const totalPKB = perKecamatan.reduce(
            (total, item) => total + Number(item.total_pkb || 0),
            0
        )

        dashSetText('dashBelumDL', dashAngka(statistik.belumDL))
        dashSetText('dashPotensiPKB', dashRupiah(totalPKB))
        dashSetText(
            'dashPemetaanSK',
            dashAngka(statistik.berhasilDipetakan)
        )
        dashSetText(
            'dashPemetaanKecamatan',
            dashAngka(perKecamatan.length)
        )

        dashSetText(
            'dashPemetaanUpdate',
            result.run?.finished_at
                ? 'Pemetaan terakhir: ' + dashFormatTanggal(result.run.finished_at)
                : 'Hasil pemetaan terakhir'
        )

        tampilkanPrioritasDashboard(perKecamatan)

    } catch (error) {
        console.error('Dashboard Pemetaan:', error)
        dashSetText('dashPemetaanUpdate', 'Gagal memuat data Pemetaan')
    }
}

/* ==========================================
   TABEL PRIORITAS R4
========================================== */

function tampilkanPrioritasDashboard(perKecamatan) {

    const tbody = document.getElementById('dashTabelPrioritas')
    if (!tbody) return

    tbody.replaceChildren()

    const urutan = [...perKecamatan].sort(
        (a, b) => Number(b.jumlah_sk) - Number(a.jumlah_sk)
    )

    if (!urutan.length) {
        const tr = document.createElement('tr')
        const td = document.createElement('td')
        td.colSpan = 5
        td.textContent = 'Belum ada data prioritas'
        td.style.textAlign = 'center'
        tr.appendChild(td)
        tbody.appendChild(tr)
        return
    }

    urutan.slice(0, 5).forEach((item, index) => {

        const tr = document.createElement('tr')

        const nilai = [
            index + 1,
            item.kecamatan,
            item.wilayah ? 'Wilayah ' + item.wilayah : '-',
            dashAngka(item.jumlah_sk),
            dashRupiah(item.total_pkb)
        ]

        nilai.forEach(value => {
            const td = document.createElement('td')
            td.textContent = value
            tr.appendChild(td)
        })

        tbody.appendChild(tr)
    })
}

/* ==========================================
   INISIALISASI
========================================== */

function initDashboard() {
    loadDashboardAutomation()
    loadDashboardPemetaan()
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard)
} else {
    initDashboard()
}
