const db = require('../database/db')

const {
  nowJakarta
} = require('../services/utils/date')

async function entrySk(page, pegawaiId, batchId) {

  console.log('')
  console.log('=========================')
  console.log('ENTRY SK')
  console.log('=========================')
  console.log('')
  console.log('BATCH ID:', batchId)

  const datas = db.prepare(`
    SELECT *
    FROM sk_data
    WHERE
      pegawai_id = ?
      AND status_proses = 'pending'
      AND batch_id = ?
  `).all(
    pegawaiId,
    batchId
  )

  console.log('Total SK:', datas.length)

  for (const data of datas) {

    console.log('')
    console.log('No Entri:', data.no_entri)

    let url = ''
    let payload = {}

    // =========================
    // ENDPOINT
    // =========================

    if (data.jenis_surat === 'SPOS') {

      url = 'https://siapp.dipendajatim.go.id/proses/saveSPOS.php'

      payload = {
        nspos: data.no_entri
      }

    } else if (data.jenis_surat === 'NPP') {

      url = 'https://siapp.dipendajatim.go.id/proses/saveNPP.php'

      payload = {
        nonpp: data.no_entri
      }

    } else if (data.jenis_surat === 'NTP') {

      url = 'https://siapp.dipendajatim.go.id/proses/saveNTP.php'

      payload = {
        nontp: data.no_entri
      }

    } else if (data.jenis_surat === 'ETULNTP') {

      url = 'https://siapp.dipendajatim.go.id/proses/saveNTP.php'

      payload = {
        nontp: data.no_entri
      }

    }

    try {

      const response = await page.request.post(url, {
        form: payload
      })

      const result = await response.text()

      let statusProses = 'failed'

      if (result.trim() === '1') {

        statusProses = 'success'

      } else if (result.trim() === '4') {

        statusProses = 'not_found'

      } else {

        statusProses = 'duplicate'

      }

      db.prepare(`
        UPDATE sk_data
        SET
          status_proses = ?,
          response_siapp = ?,
          processed_at = ?
        WHERE id = ?
      `).run(
        statusProses,
        result,
        nowJakarta(),
        data.id
      )

      console.log('Status:', statusProses)

    } catch (err) {

      console.log('Error:', err.message)

    }

    // delay
    await page.waitForTimeout(100)

  }

}

module.exports = entrySk