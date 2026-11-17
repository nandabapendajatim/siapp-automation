
const fs = require('fs')
const path = require('path')

const {
    savePemetaan
} = require('./pemetaan-save')

const { chromium } = require('playwright')
const db = require('../../database/db')

const login = require('../login')
const MENU = require('../monitoring/monitoring-menu')

const {
    fetchMonitoring
} = require('../monitoring/monitoring-fetch')

const {
    parseMonitoring
} = require('../monitoring/monitoring-parser')

const {
    olahPemetaan
} = require('./pemetaan-olah')

// ==========================================
// PROGRESS PEMETAAN
// ==========================================

const statusFile = path.join(
    __dirname,
    '../../pemetaan-status.json'
)

function updateProgress(tahap, pesan, tambahan = {}) {
    const status = {
        status: 'running',
        tahap,
        pesan,
        ...tambahan,
        updated_at: new Date().toISOString()
    }

    const tempFile = statusFile + '.tmp'

    fs.writeFileSync(
        tempFile,
        JSON.stringify(status, null, 2)
    )

    fs.renameSync(tempFile, statusFile)
}

// ==========================================
// PROSES PEMETAAN
// ==========================================

async function pemetaan(bulan, tahun) {
    const startedAt = new Date()

    console.log('============================')
    console.log('PEMETAAN DINAS LUAR DIMULAI')
    console.log('============================')

    const accounts = db.prepare(`
        SELECT *
        FROM pegawai
        WHERE aktif = 1
        ORDER BY urutan
    `).all()

    console.log(`Total pegawai: ${accounts.length}`)

    if (accounts.length === 0) {
        throw new Error('Tidak ada pegawai aktif')
    }

    const semuaData = []

    updateProgress(
        'pengambilan',
        'Menyiapkan pengambilan data SIAPP...',
        {
            pegawai_selesai: 0,
            pegawai_total: accounts.length
        }
    )

    const browser = await chromium.launch({
        headless: false
    })

    try {
        const page = await browser.newPage()

        for (const [index, account] of accounts.entries()) {
            console.log(
                `[${index + 1}/${accounts.length}] ${account.nama}`
            )

            updateProgress(
                'pengambilan',
                `Mengambil data pegawai ${index + 1} dari ${accounts.length}: ${account.nama}`,
                {
                    pegawai_selesai: index,
                    pegawai_total: accounts.length,
                    pegawai_aktif: account.nama,
                    sk_diambil: semuaData.length
                }
            )

            try {
                await login(page, account)

                for (const menu of Object.values(MENU)) {
                    console.log(`Mengambil ${menu.nama}...`)

                    const html = await fetchMonitoring(
                        page,
                        menu,
                        bulan,
                        tahun
                    )

                    const hasil = parseMonitoring(
                        html,
                        account,
                        menu.nama
                    )

                    console.log(
                        `${menu.nama}: ${hasil.length} SK`
                    )

                    semuaData.push(...hasil)
                }
            } finally {
                try {
                    await page.goto(
                        'https://siapp.dipendajatim.go.id/logout.php',
                        { waitUntil: 'domcontentloaded' }
                    )
                } catch (err) {
                    console.warn(
                        `Logout ${account.nama}: ${err.message}`
                    )
                }
            }

            updateProgress(
                'pengambilan',
                `${index + 1} dari ${accounts.length} pegawai selesai diperiksa`,
                {
                    pegawai_selesai: index + 1,
                    pegawai_total: accounts.length,
                    sk_diambil: semuaData.length
                }
            )
        }

        // ==================================
        // TAHAP 2 - PENYARINGAN
        // ==================================

        updateProgress(
            'penyaringan',
            `Pengambilan selesai. ${semuaData.length} SK terkumpul. Menyaring data R4 dan periode...`,
            {
                pegawai_selesai: accounts.length,
                pegawai_total: accounts.length,
                sk_diambil: semuaData.length
            }
        )

        // ==================================
        // PENGOLAHAN
        // ==================================

        const hasilPemetaan = olahPemetaan(semuaData)

        // ==================================
        // TAHAP 3 - IDENTIFIKASI
        // ==================================

        updateProgress(
            'identifikasi',
            `${hasilPemetaan.statistik.berhasilDipetakan} SK berhasil diidentifikasi`,
            {
                pegawai_selesai: accounts.length,
                pegawai_total: accounts.length,
                sk_diambil: semuaData.length,
                statistik: hasilPemetaan.statistik
            }
        )

        // ==================================
        // TAHAP 4 - PENGELOMPOKAN
        // ==================================

        updateProgress(
            'pengelompokan',
            `${hasilPemetaan.kelompok.length} kelompok pegawai/kecamatan terbentuk`,
            {
                pegawai_selesai: accounts.length,
                pegawai_total: accounts.length,
                jumlah_kelompok: hasilPemetaan.kelompok.length
            }
        )

        // ==================================
        // TAHAP 5 - PENYIMPANAN
        // ==================================

        updateProgress(
            'penyimpanan',
            'Menyimpan hasil Pemetaan ke SQLite...'
        )

        const runId = savePemetaan(
            hasilPemetaan,
            startedAt
        )

        console.log(`Hasil pemetaan tersimpan. Run ID: ${runId}`)

        console.log('\n=== STATISTIK PEMETAAN ===')
        console.table(hasilPemetaan.statistik)

        console.log('\n=== JUMLAH PER KECAMATAN ===')
        console.table(hasilPemetaan.perKecamatan)

        console.log('\n=== JUMLAH PER PEGAWAI / KECAMATAN ===')
        console.table(hasilPemetaan.kelompok)

        console.log('\n=== DATA TIDAK TERIDENTIFIKASI ===')
        console.log(hasilPemetaan.pengecualian.length)

        console.log('\nPEMETAAN SELESAI')

        updateProgress(
            'selesai',
            'Seluruh tahapan Pemetaan selesai.',
            {
                run_id: runId,
                statistik: hasilPemetaan.statistik
            }
        )

        return hasilPemetaan

    } finally {
        await browser.close()
    }
}

module.exports = pemetaan
