const db = require('./database/db')

// =========================
// DATA PEGAWAI
// =========================

const pegawai = [
  {
    nama: 'CRISTANANDA RATNADY',
    nip: '199301072025041005',
    password: 'BANGKALAN',
    kdsamsat: '831'
  }
]

// =========================
// INSERT DATABASE
// =========================

for (const p of pegawai) {

  try {

    db.prepare(`
      INSERT INTO pegawai (
        nama,
        nip,
        password,
        kdsamsat
      )
      VALUES (?, ?, ?, ?)
    `).run(
      p.nama,
      p.nip,
      p.password,
      p.kdsamsat
    )

    console.log('Berhasil tambah:', p.nama)

  } catch (err) {

    console.log('Gagal:', err.message)

  }

}