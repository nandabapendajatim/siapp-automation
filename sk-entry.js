db.prepare(`
  DELETE FROM sqlite_sequence
  WHERE name='pegawai'
`).run()

console.log('Reset pegawai selesai')