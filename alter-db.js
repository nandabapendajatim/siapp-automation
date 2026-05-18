const db = require('./database/db')

try {

  db.exec(`
    ALTER TABLE sk_data
    ADD COLUMN response_siapp TEXT
  `)

  console.log('Kolom response_siapp berhasil ditambahkan')

} catch (err) {

  console.log('response_siapp sudah ada')

}

try {

  db.exec(`
    ALTER TABLE sk_data
    ADD COLUMN processed_at DATETIME
  `)

  console.log('Kolom processed_at berhasil ditambahkan')

} catch (err) {

  console.log('processed_at sudah ada')

}