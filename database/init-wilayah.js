
const Database = require('better-sqlite3')
const path = require('path')

const db = new Database(
    path.join(__dirname, '..', 'database.sqlite'),
    { fileMustExist: true }
)

console.log('Database berhasil dibuka')

db.exec(`
    CREATE TABLE IF NOT EXISTS ms_wilayah (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        wilayah INTEGER NOT NULL,
        kecamatan TEXT NOT NULL UNIQUE
    )
`)

const dataWilayah = [
    [1, 'BANGKALAN'],
    [1, 'SOCAH'],
    [1, 'KAMAL'],
    [1, 'BURNEH'],

    [2, 'AROSBAYA'],
    [2, 'KLAMPIS'],
    [2, 'SEPULU'],
    [2, 'TANJUNG BUMI'],

    [3, 'LABANG'],
    [3, 'TRAGAH'],
    [3, 'KWANYAR'],
    [3, 'TANAH MERAH'],
    [3, 'MODUNG'],

    [4, 'KOKOP'],
    [4, 'KONANG'],
    [4, 'GEGER'],
    [4, 'GALIS'],
    [4, 'BLEGA']
]

const insert = db.prepare(`
    INSERT INTO ms_wilayah (wilayah, kecamatan)
    VALUES (?, ?)
    ON CONFLICT(kecamatan)
    DO UPDATE SET wilayah = excluded.wilayah
`)

const simpan = db.transaction(() => {
    for (const [wilayah, kecamatan] of dataWilayah) {
        insert.run(wilayah, kecamatan)
    }
})

simpan()

console.log('Master wilayah berhasil disimpan')
console.log('Jumlah kecamatan:', dataWilayah.length)

const hasil = db.prepare(`
    SELECT wilayah, kecamatan
    FROM ms_wilayah
    ORDER BY wilayah, kecamatan
`).all()

console.table(hasil)

db.close()
