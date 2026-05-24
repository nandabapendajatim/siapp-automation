const db = require('./database/db')

try {

  db.exec(`
    ALTER TABLE pegawai
    ADD COLUMN urutan INTEGER
  `)

  console.log('Kolom urutan berhasil ditambahkan')

} catch (err) {

  console.log('urutan sudah ada')

}