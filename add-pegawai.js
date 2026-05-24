const db = require('./database/db')

// =========================
// DATA PEGAWAI
// =========================

const pegawai = [
   {
    nama: 'ENDAH WILUJENG IKRIMAH',
    nip: '196807031991122001',
    password: 'endah',
    kdsamsat: '831'
  },

  {
    nama: 'SYAMSUL NOERHAJATI',
    nip: '197109081997032004',
    password: 'Marzia',
    kdsamsat: '831'
  },

  {
    nama: 'ADITYA CHRESTYANTO RAHARJO',
    nip: '198409132010011023',
    password: 'adit',
    kdsamsat: '831'
  },

  {
    nama: 'MUHAMMAD ASIS',
    nip: '196806052008011018',
    password: 'azis',
    kdsamsat: '831'
  },

  {
    nama: 'ARUM AMALIA MASYITAH',
    nip: '199803102022042001',
    password: 'arum',
    kdsamsat: '831'
  },

  {
    nama: 'DONA AMBARSARI',
    nip: '200001242025042006',
    password: 'bangkalann',
    kdsamsat: '831'
  },

  {
    nama: 'CRISTANANDA RATNADY',
    nip: '199301072025041005',
    password: 'BANGKALAN',
    kdsamsat: '831'
  },

  {
    nama: 'EVY DWI CAHYATI',
    nip: '199509292025042002',
    password: 'BANGKALAN',
    kdsamsat: '831'
  },

  {
    nama: 'DEFRIANTO WAHYU PUTRA PRATAMA',
    nip: '200003242025041007',
    password: 'BANGKALAN',
    kdsamsat: '831'
  },

  {
    nama: 'MOH. HAMDANI ARIF',
    nip: '120020919880120143410',
    password: 'dani',
    kdsamsat: '831'
  },

  {
    nama: 'LINA SANDRAWATI',
    nip: '120180719850520103393',
    password: '989898',
    kdsamsat: '831'
  },

  {
    nama: 'SHOVIA DEWI KRISNAWATI',
    nip: '120090419810520103138',
    password: 'Resya',
    kdsamsat: '831'
  },

  {
    nama: 'RASHIF SANIY ALIMNY',
    nip: '202050619960620208583',
    password: 'RASHIF',
    kdsamsat: '831'
  },

  {
    nama: 'AGUS RAHMADI',
    nip: '120270819870120143403',
    password: 'sampang',
    kdsamsat: '831'
  },

  {
    nama: 'ALIMUDDIN',
    nip: '120080219820120103390',
    password: '820006',
    kdsamsat: '831'
  },

  {
    nama: 'YUL WIRYAWAN',
    nip: '120030719790620072904',
    password: 'utara',
    kdsamsat: '831'
  },

  {
    nama: 'EDDY SUYANTO',
    nip: '197001312010011002',
    password: 'eddy',
    kdsamsat: '831'
  },

  {
    nama: 'RADEN ARIE IRIADI',
    nip: '197601262009011001',
    password: 'sampang',
    kdsamsat: '831'
  },

  {
    nama: 'SOENARTI',
    nip: '197107272009012003',
    password: 'nana',
    kdsamsat: '831'
  },

  {
    nama: 'ARIFUDIN HANSYA',
    nip: '196912181989031004',
    password: 'pacitan',
    kdsamsat: '831'
  },

  {
    nama: 'PRADITYA NORMA HAMDHONNY',
    nip: '120060719820520102883',
    password: 'adiet',
    kdsamsat: '831'
  },

  {
    nama: 'MUHAMMAD HASIM',
    nip: '120140319810120113396',
    password: 'HASIM',
    kdsamsat: '831'
  },

  {
    nama: 'NASIR',
    nip: '120260719730120093397',
    password: 'nasir',
    kdsamsat: '831'
  },

  {
    nama: 'PURUHITO NUR BUSTAN',
    nip: '120190619820120113266',
    password: 'ito',
    kdsamsat: '831'
  },

  {
    nama: 'BUDI YULI SANTOSO',
    nip: '120100719830820053378',
    password: 'ABIY9228',
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