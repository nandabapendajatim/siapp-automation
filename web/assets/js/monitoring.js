let monitoringInterval = null

async function runMonitoring() {

    const status =
        document.getElementById(
            'monitoringStatus'
        )

    const btn =
        document.getElementById(
            'btnMonitoring'
        )

    btn.disabled = true

    status.innerHTML =
        'Memulai monitoring...'

    try {

        await fetch(

            'api/monitoring-run.php',

            {

                method: 'POST'

            }

        )

        startMonitoringPolling()

    }

    catch (err) {

        status.innerHTML =
            err.message

        btn.disabled = false

    }

}

function startMonitoringPolling() {

    if (monitoringInterval) {

        clearInterval(
            monitoringInterval
        )

    }

    loadMonitoring()

    monitoringInterval =
        setInterval(

            loadMonitoring,

            1000

        )

}

async function loadMonitoring() {

    try {

        const res =
            await fetch(
                'api/monitoring-status.php'
            )

        const data =
            await res.json()

        const status =
            document.getElementById(
                'monitoringStatus'
            )

        const pegawai =
            document.getElementById(
                'currentPegawai'
            )

        const menu =
            document.getElementById(
                'currentMenu'
            )

        const progress =
            document.getElementById(
                'currentProgress'
            )

        const bar =
            document.getElementById(
                'progressBar'
            )

        const log =
            document.getElementById(
                'monitoringLog'
            )

        const btn =
            document.getElementById(
                'btnMonitoring'
            )

        // ======================
        // STATUS
        // ======================

        if (data.running) {

            status.className =
                'alert alert-warning'

            status.innerHTML =
                `
                🟡 <b>Sedang Berjalan</b>

                <br>

                ${data.message}

                <br><br>

                Pegawai
                <b>${data.current}</b>
                dari
                <b>${data.total}</b>
                `

        }
        else if (data.finished) {

            status.className =
                'alert alert-success'

            status.innerHTML =
                `
                🟢 <b>Monitoring selesai</b>

                <br>

                Durasi :
                <b>${formatDuration(data.duration)}</b>

                `

            btn.disabled = false

            clearInterval(
                monitoringInterval
            )

        }
        else {

            status.className =
                'alert alert-info'

            status.innerHTML =
                'Siap dijalankan'

        }

        // ======================
        // INFO
        // ======================

        pegawai.innerHTML =
            `
            <b>${data.currentPegawai || '-'}</b>
            `

        menu.innerHTML =
            `
            <b>${data.currentMenu || '-'}</b>
            `

        progress.innerHTML =
            `
            <b>${data.current}</b>
            dari
            <b>${data.total}</b>
            Pegawai
            `

        // ======================
        // PROGRESS BAR
        // ======================

        let persen = 0

        if (data.total > 0) {

            persen = Math.round(

                (data.current / data.total) * 100

            )

        }

        const progressPercent =
            document.getElementById(
                'progressPercent'
            )

        bar.style.width =
            persen + '%'

        bar.innerHTML =
            persen + '%'

        progressPercent.innerHTML =
            persen + '%'

        bar.classList.remove(

            'bg-success',

            'bg-warning',

            'bg-danger'

        )

        if (data.running) {

            bar.classList.add(
                'bg-warning'
            )

        }
        else if (data.finished) {

            bar.classList.add(
                'bg-success'
            )

        }
        else {

            bar.classList.add(
                'bg-danger'
            )

        }

        // ======================
        // LOG
        // ======================

        log.innerHTML =
            data.logs.join('\n')

        log.scrollTop =
            log.scrollHeight

    }

    catch (err) {

        console.error(err)

    }

}

function downloadMonitoringExcel() {

    window.location =
        'api/monitoring-excel.php'

}

function downloadMonitoringWA() {

    window.location =
        'api/monitoring-wa.php'

}

startMonitoringPolling()

function formatDuration(second) {

    if (!second)
        return '-'

    const m =
        Math.floor(second / 60)

    const s =
        second % 60

    return `${m} menit ${s} detik`

}

async function generatePreviewWA() {

    const preview =
        document.getElementById(
            'waPreview'
        )

    preview.innerHTML =
        'Membuat preview...'

    try {

        const res =
            await fetch(
                'api/monitoring-preview.php'
            )

        const text =
            await res.text()

        preview.innerHTML =
            text

    }

    catch (err) {

        preview.innerHTML =
            err.message

    }

}
