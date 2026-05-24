const db = require('../database/db')

async function distributeSk() {

  console.log('')
  console.log('=========================')
  console.log('DISTRIBUTE SK')
  console.log('=========================')

  // =========================
  // RESET PEMBAGIAN
  // =========================

  db.prepare(`
    UPDATE sk_data
    SET pegawai_id = NULL
    WHERE status_proses = 'pending'
  `).run()

  console.log('Reset pembagian selesai')

  // =========================
  // AMBIL PEGAWAI AKTIF
  // =========================

  const pegawaiList = db.prepare(`
    SELECT *
    FROM pegawai
    WHERE aktif = 1
    ORDER BY id ASC
  `).all()

  // =========================
  // VALIDASI PEGAWAI
  // =========================

  if (pegawaiList.length === 0) {

    console.log('Tidak ada pegawai aktif')

    return

  }

  // =========================
  // AMBIL SK BELUM DIBAGIKAN
  // =========================

  const skList = db.prepare(`
    SELECT *
    FROM sk_data
    WHERE pegawai_id IS NULL
    AND status_proses = 'pending'
    ORDER BY id ASC
  `).all()

  // =========================
  // VALIDASI SK
  // =========================

  if (skList.length === 0) {

    console.log('Tidak ada SK pending')

    return

  }

  console.log('Total Pegawai:', pegawaiList.length)
  console.log('Total SK:', skList.length)

  // =========================
  // BAGI RATA
  // =========================

  let pegawaiIndex = 0

  for (const sk of skList) {

    const pegawai = pegawaiList[pegawaiIndex]

    // =========================
    // UPDATE PEGAWAI
    // =========================

    db.prepare(`
      UPDATE sk_data
      SET pegawai_id = ?
      WHERE id = ?
    `).run(
      pegawai.id,
      sk.id
    )

    console.log(
      sk.no_entri,
      '=>',
      pegawai.nama
    )

    // =========================
    // PINDAH PEGAWAI
    // =========================

    pegawaiIndex++

    // kalau sudah habis
    // balik ke pegawai pertama
    if (pegawaiIndex >= pegawaiList.length) {

      pegawaiIndex = 0

    }

  }

  // =========================
  // SUMMARY
  // =========================

  console.log('')
  console.log('=========================')
  console.log('SUMMARY PEMBAGIAN')
  console.log('=========================')

  for (const pegawai of pegawaiList) {

    const total = db.prepare(`
      SELECT COUNT(*) as total
      FROM sk_data
      WHERE pegawai_id = ?
      AND status_proses = 'pending'
    `).get(pegawai.id)

    console.log(
      pegawai.nama,
      '=',
      total.total,
      'SK'
    )

  }

  console.log('')
  console.log('=========================')
  console.log('DISTRIBUTE SELESAI')
  console.log('=========================')

}

module.exports = distributeSk