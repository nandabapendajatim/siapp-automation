const Database = require('better-sqlite3')

const db = new Database('database.sqlite')

// =========================
// TABLE SK DATA
// =========================

db.exec(`
  CREATE TABLE IF NOT EXISTS sk_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    no_entri TEXT,
    nopol TEXT,
    nama TEXT,
    desa TEXT,
    kecamatan TEXT,
    potensi TEXT,
    tgl_cetak TEXT,
    jenis_surat TEXT,
    pegawai_id INTEGER,
    status_proses TEXT DEFAULT 'pending',
    response_siapp TEXT,
    processed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(no_entri, jenis_surat)
  )
`)

// =========================
// TABLE PEGAWAI
// =========================

db.exec(`
  CREATE TABLE IF NOT EXISTS pegawai (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT,
    nip TEXT,
    password TEXT,
    kdsamsat TEXT,
    aktif INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

module.exports = db