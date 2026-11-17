
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

const root = __dirname

const statusFile = path.join(
    root,
    'pemetaan-status.json'
)

// ==========================================
// BACA STATUS TERAKHIR
// ==========================================

function bacaStatus() {
    try {
        if (!fs.existsSync(statusFile)) {
            return {}
        }

        return JSON.parse(
            fs.readFileSync(statusFile, 'utf8')
        )
    } catch (error) {
        console.error(
            'Gagal membaca status:',
            error.message
        )

        return {}
    }
}

// ==========================================
// SIMPAN STATUS TANPA MENGHAPUS PROGRES
// ==========================================

function simpanStatus(status, pesan, tambahan = {}) {
    const sebelumnya = bacaStatus()

    const data = {
        ...sebelumnya,
        ...tambahan,
        status,
        pesan,
        updated_at: new Date().toISOString()
    }

    const tempFile = statusFile + '.runner.tmp'

    fs.writeFileSync(
        tempFile,
        JSON.stringify(data, null, 2)
    )

    fs.renameSync(tempFile, statusFile)
}

// ==========================================
// MULAI PROSES
// ==========================================

simpanStatus(
    'running',
    'Menyiapkan Playwright untuk Pemetaan...',
    {
        tahap: 'persiapan',
        pegawai_selesai: 0,
        pegawai_total: 0,
        sk_diambil: 0,
        statistik: null,
        jumlah_kelompok: 0,
        run_id: null
    }
)

// ==========================================
// JALANKAN PLAYWRIGHT
// ==========================================

const child = spawn(
    process.platform === 'win32'
        ? 'npx.cmd'
        : 'npx',
    [
        'playwright',
        'test',
        'tests/pemetaan.spec.js',
        '--project=chromium',
        '--headed'
    ],
    {
        cwd: root,
        shell: process.platform === 'win32',
        stdio: 'ignore'
    }
)

// ==========================================
// PENANGANAN ERROR
// ==========================================

let gagalMenjalankan = false

child.on('error', error => {
    gagalMenjalankan = true

    console.error(
        'Gagal menjalankan Playwright:',
        error.message
    )

    simpanStatus(
        'failed',
        'Gagal menjalankan Playwright: ' +
            error.message
    )

    process.exitCode = 1
})

// ==========================================
// PROSES SELESAI
// ==========================================

child.on('close', code => {
    if (gagalMenjalankan) {
        return
    }

    if (code === 0) {
        simpanStatus(
            'success',
            'Seluruh proses Pemetaan berhasil diselesaikan.',
            {
                tahap: 'selesai',
                finished_at: new Date().toISOString()
            }
        )

        console.log(
            'Pemetaan berhasil diselesaikan.'
        )

    } else {
        simpanStatus(
            'failed',
            `Proses Pemetaan gagal (exit code ${code}).`,
            {
                finished_at: new Date().toISOString()
            }
        )

        console.error(
            `Pemetaan gagal dengan exit code ${code}.`
        )
    }
})
