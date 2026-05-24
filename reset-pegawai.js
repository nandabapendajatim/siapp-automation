const db = require('./database/db')

db.prepare(`
  DELETE FROM pegawai
`).run()

db.prepare(`
  DELETE FROM sqlite_sequence
  WHERE name='pegawai'
`).run()

console.log('Reset pegawai selesai')