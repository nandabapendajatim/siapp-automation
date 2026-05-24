const db = require('./database/db')

// =========================
// NONAKTIFKAN SEMUA
// =========================

db.prepare(`
  UPDATE pegawai
  SET aktif = 0
  
  
`).run()

console.log('Semua pegawai nonaktif')

// =========================
// AKTIFKAN PEGAWAI TEST
// =========================

const pegawaiAktif = [
  'CRISTANANDA RATNADY',
  'DEFRIANTO WAHYU PUTRA PRATAMA'
]

for (const nama of pegawaiAktif) {

  db.prepare(`
    UPDATE pegawai
    SET aktif = 1
    WHERE nama = ?
  `).run(nama)

  console.log('Aktif:', nama)

}

console.log('Selesai')