const { chromium } = require('playwright')

const login = require('../login')

const MENU = require('./monitoring-menu')

const {
    fetchMonitoring
} = require('./monitoring-fetch')

const {
    parseMonitoring
} = require('./monitoring-parser')

const {
    clearMonitoring,
    saveMonitoringRun,
    saveMonitoringDetail
} = require('./monitoring-save')

const {
    getSummary,
    getReminderPegawai
} = require('./monitoring-report')

const generateBatchId =
    require('../utils/generateBatchId')

const db = require('../../database/db')

const {

    writeStatus,

    appendLog,

    clearLog

} = require('./monitoring-status')

async function monitoring(
    bulan,
    tahun
) {

    clearLog()

    writeStatus({

        running: true,

        finished: false,

        currentPegawai: '',

        currentMenu: '',

        current: 0,

        total: 0,

        message: 'Memulai monitoring...',

        updated_at: new Date().toISOString()

    })

    appendLog('Monitoring dimulai')

    console.log('========================')
    console.log('MONITORING DIMULAI')
    console.log('========================')

    clearMonitoring()

    const startedAt =
        new Date()

    const batchId =
        generateBatchId()

    const browser =
        await chromium.launch({

            headless: false

        })

    const page =
        await browser.newPage()

    const accounts =
        db.prepare(`

            SELECT *

            FROM pegawai

            WHERE aktif = 1

            ORDER BY urutan

        `).all()

    writeStatus({

        running: true,

        finished: false,

        currentPegawai: '',

        currentMenu: '',

        current: 0,

        total: accounts.length,

        message: 'Monitoring dimulai',

        updated_at: new Date().toISOString()

    })

    appendLog(

        `Total pegawai : ${accounts.length}`

    )

    const runId =
        saveMonitoringRun({

            batch_id: batchId,

            started_at:
                startedAt.toISOString(),

            finished_at: null,

            duration_seconds: 0,

            total_pegawai:
                accounts.length,

            total_sk: 0,

            total_reminder: 0,

            total_spos: 0,

            total_npp: 0,

            total_ntp: 0

        })

    try {

        for (const [index, account] of accounts.entries()) {

            console.log('\n=================================')
            console.log(`PEGAWAI : ${account.nama}`)
            console.log('=================================')

            writeStatus({

                running: true,

                finished: false,

                currentPegawai: account.nama,

                currentMenu: 'Login',

                current: index + 1,

                total: accounts.length,

                message: 'Login pegawai',

                updated_at: new Date().toISOString()

            })

            appendLog(

                `[${index + 1}/${accounts.length}] Login ${account.nama}`

            )

            appendLog(
                'Membuka halaman login...'
            )

            try {

                await login(
                    page,
                    account
                )

                appendLog(
                    'Login berhasil'
                )

                for (const key of Object.keys(MENU)) {

                    const menu =
                        MENU[key]

                    writeStatus({

                        running: true,

                        finished: false,

                        currentPegawai: account.nama,

                        currentMenu: menu.nama,

                        current: index + 1,

                        total: accounts.length,

                        message: `Mengambil ${menu.nama}`,

                        updated_at: new Date().toISOString()

                    })

                    appendLog(
                        `Membuka menu ${menu.nama}...`
                    )

                    console.log(`\n>> ${menu.nama}`)

                    const html =
                        await fetchMonitoring(

                            page,

                            menu,

                            bulan,

                            tahun

                        )

                    const hasil =
                        parseMonitoring(

                            html,

                            account,

                            menu.nama

                        )

                    appendLog(
                        `${menu.nama} : ${hasil.length} data ditemukan`
                    )

                    console.log(
                        `${hasil.length} data ditemukan`
                    )

                    saveMonitoringDetail(

                        runId,

                        hasil

                    )

                    appendLog(
                        `${menu.nama} berhasil disimpan`
                    )

                    console.log(
                        'Disimpan ke database'
                    )

                }

            }
            catch (err) {

                console.error(
                    `ERROR ${account.nama}`
                )

                console.error(
                    err.message
                )

                appendLog(

                    `ERROR ${account.nama} : ${err.message}`

                )

            }
            finally {

                try {

                    await page.goto(

                        'https://siapp.dipendajatim.go.id/logout.php'

                    )

                    await page.waitForLoadState(
                        'networkidle'
                    )

                    appendLog(
                        'Logout berhasil'
                    )

                }
                catch {

                    // abaikan jika logout gagal

                }

            }

        }

        const finishedAt =
            new Date()

        const duration =
            Math.floor(

                (

                    finishedAt -

                    startedAt

                ) / 1000

            )

        const summary =
            getSummary()

        const reminderPegawai =
            getReminderPegawai()

        db.prepare(`

            UPDATE monitoring_run

            SET

                finished_at=?,

                duration_seconds=?,

                total_sk=?,

                total_reminder=?,

                total_spos=?,

                total_npp=?,

                total_ntp=?

            WHERE id=?

        `).run(

            finishedAt.toISOString(),

            duration,

            summary.total,

            summary.reminder,

            summary.spos,

            summary.npp,

            summary.ntp,

            runId

        )

        console.log('\n========================')
        console.log('MONITORING SELESAI')
        console.log('========================')

        console.table(summary)

        console.log('\n========================')
        console.log('REMINDER PER PEGAWAI')
        console.log('========================')

        console.table(reminderPegawai)

        writeStatus({

            running: false,

            finished: true,

            currentPegawai: '',

            currentMenu: '',

            current: accounts.length,

            total: accounts.length,

            duration: duration,

            message: 'Monitoring selesai',

            updated_at: new Date().toISOString()

        })

        appendLog('Monitoring selesai')

    }
    finally {

        writeStatus({

            running: false,

            finished: true,

            currentPegawai: '',

            currentMenu: '',

            current: accounts.length,

            total: accounts.length,

            message: 'Monitoring berhenti',

            updated_at: new Date().toISOString()

        })

        appendLog('Menutup browser...')

        await browser.close()

        appendLog('Browser berhasil ditutup')

    }

}

module.exports =
    monitoring