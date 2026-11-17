
const Database = require('better-sqlite3')
const path = require('path')

const db = new Database(
    path.join(__dirname, '..', 'database.sqlite'),
    { fileMustExist: true }
)

const run = db.prepare(`
    SELECT id
    FROM pemetaan_run
    ORDER BY id DESC
    LIMIT 1
`).get()

if (!run) {
    console.log('Belum ada hasil pemetaan.')
    db.close()
    process.exit(0)
}

console.log('\n=== PENYEBAB PENGECUALIAN ===')

const alasan = db.prepare(`
    SELECT
        COALESCE(NULLIF(TRIM(alasan), ''), '(Kosong)') AS alasan,
        COUNT(*) AS jumlah
    FROM pemetaan_pengecualian
    WHERE run_id = ?
    GROUP BY COALESCE(NULLIF(TRIM(alasan), ''), '(Kosong)')
    ORDER BY jumlah DESC
`).all(run.id)

console.table(alasan)

console.log('\n=== KECAMATAN YANG TEREKAM ===')

const kecamatan = db.prepare(`
    SELECT
        COALESCE(NULLIF(TRIM(kecamatan), ''), '(Kosong)') AS kecamatan,
        COUNT(*) AS jumlah
    FROM pemetaan_pengecualian
    WHERE run_id = ?
    GROUP BY COALESCE(NULLIF(TRIM(kecamatan), ''), '(Kosong)')
    ORDER BY jumlah DESC
`).all(run.id)

console.table(kecamatan)

console.log('\n=== CONTOH 30 DATA PENGECUALIAN ===')

const contoh = db.prepare(`
    SELECT
        jenis_surat,
        no_entry,
        kecamatan,
        alamat,
        alasan
    FROM pemetaan_pengecualian
    WHERE run_id = ?
    LIMIT 30
`).all(run.id)

console.table(contoh)

console.log('\n=== TOTAL ===')

const total = db.prepare(`
    SELECT COUNT(*) AS jumlah
    FROM pemetaan_pengecualian
    WHERE run_id = ?
`).get(run.id)

console.log('Total pengecualian:', total.jumlah)

db.close()
