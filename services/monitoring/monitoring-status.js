const fs = require('fs')
const path = require('path')

const STATUS_FILE = path.join(
    __dirname,
    '..',
    '..',
    'logs',
    'monitoring-status.json'
)

// =========================
// BACA STATUS
// =========================

function readStatus() {

    if (!fs.existsSync(STATUS_FILE)) {

        return {

            running: false,

            finished: false,

            currentPegawai: '',

            currentMenu: '',

            current: 0,

            total: 0,

            message: 'Siap dijalankan',

            updated_at: '',

            logs: []

        }

    }

    return JSON.parse(

        fs.readFileSync(

            STATUS_FILE,

            'utf8'

        )

    )

}

// =========================
// TULIS STATUS
// =========================

function writeStatus(data) {

    const current =
        readStatus()

    const status = {

        ...current,

        ...data

    }

    fs.writeFileSync(

        STATUS_FILE,

        JSON.stringify(

            status,

            null,

            2

        ),

        'utf8'

    )

}

// =========================
// TAMBAH LOG
// =========================

function appendLog(message) {

    const status =
        readStatus()

    const jam =
        new Date().toLocaleTimeString(
            'id-ID'
        )

    if (!status.logs) {

        status.logs = []

    }

    status.logs.push(

        `[${jam}] ${message}`

    )

    status.updated_at =
        new Date().toISOString()

    fs.writeFileSync(

        STATUS_FILE,

        JSON.stringify(

            status,

            null,

            2

        ),

        'utf8'

    )

}

// =========================
// HAPUS LOG
// =========================

function clearLog() {

    const status =
        readStatus()

    status.logs = []

    fs.writeFileSync(

        STATUS_FILE,

        JSON.stringify(

            status,

            null,

            2

        ),

        'utf8'

    )

}

module.exports = {

    readStatus,

    writeStatus,

    appendLog,

    clearLog

}