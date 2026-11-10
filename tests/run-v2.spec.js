require('dotenv').config()

const { test } = require('@playwright/test')

const db = require('../database/db')

const login = require('../services/login-v2')
const fetchSk = require('../services/fetchSk')
const distributeSk = require('../services/distributeSk')
const entrySk = require('../services/entrySk')

const generateBatchId = require('../services/utils/generateBatchId')

const fs = require('fs')
const path = require('path')

const logFile = path.join(
  __dirname,
  '../logs/automation.log'
)

const statusFile = path.join(
  __dirname,
  '../logs/status.json'
)

// =========================
// LOGGER
// =========================

const originalLog = console.log

console.log = (...args) => {

  const text = args.join(' ')

  originalLog(...args)

  fs.appendFileSync(
    logFile,
    text + '\n'
  )

}

// =========================
// PLAYWRIGHT
// =========================

test.use({
  browserName: 'chromium'
})

// =========================
// TIMEOUT 60 MENIT
// =========================

test.setTimeout(60 * 60 * 1000)

// =========================
// RUN AUTOMATION
// =========================

test('Run Automation SIAPP', async ({ page }) => {

  // =========================
  // CLEAR LOG
  // =========================

  fs.writeFileSync(logFile, '')

  // =========================
  // STATUS RUNNING
  // =========================

  fs.writeFileSync(
    statusFile,
    JSON.stringify(
      {
        running: true
      },
      null,
      2
    )
  )

  try {

    const startedAt =
      Date.now()

    const mulai =
      new Date()
        .toLocaleTimeString(
          'id-ID'
        )

    console.log('')
    console.log('=========================')
    console.log('START AUTOMATION')
    console.log('=========================')

    // =========================
    // GENERATE BATCH ID
    // =========================

    const batchId = generateBatchId()

    console.log('')
    console.log('BATCH ID:', batchId)

    // =========================
    // LOGIN KASI
    // =========================

    const akunKasi = {
      nama: 'KASI',
      kdsamsat: process.env.KASI_KDSAMSAT,
      nip: process.env.KASI_NIP,
      password: process.env.KASI_PASSWORD
    }

    await login(page, akunKasi)

    // =========================
    // FETCH DATA SK
    // =========================

    await fetchSk(
      page,
      batchId
    )

    // =========================
    // DISTRIBUTE SK
    // =========================

    await distributeSk(batchId)

    // =========================
    // LOGOUT KASI
    // =========================

    await page.goto(
      'https://siapp.dipendajatim.go.id/logout.php'
    )

    await page.waitForLoadState('networkidle')

    // =========================
    // AMBIL SEMUA PEGAWAI AKTIF
    // =========================

    const pegawaiList = db.prepare(`
      SELECT *
      FROM pegawai
      WHERE aktif = 1
    `).all()

    console.log('')
    console.log('=========================')
    console.log(
      'TOTAL PEGAWAI:',
      pegawaiList.length
    )
    console.log('=========================')

    // =========================
    // LOOP PEGAWAI
    // =========================

    for (const pegawai of pegawaiList) {

      console.log('')
      console.log('=========================')
      console.log('PROCESS PEGAWAI')
      console.log('=========================')

      console.log('Nama:', pegawai.nama)

      // =========================
      // LOGIN PEGAWAI
      // =========================

      await login(page, pegawai)

      // =========================
      // ENTRY SK PEGAWAI
      // =========================

      await entrySk(
        page,
        pegawai.id,
        batchId
      )

      // =========================
      // LOGOUT
      // =========================

      await page.goto(
        'https://siapp.dipendajatim.go.id/logout.php'
      )

      await page.waitForLoadState('networkidle')

    }

    const duration =
      Math.floor(
        (
          Date.now()
          -
          startedAt
        )
        /
        1000
      )

    const menit =
      Math.floor(
        duration
        /
        60
      )

    const detik =
      duration
      %
      60

    const selesai =
      new Date()
        .toLocaleTimeString(
          'id-ID'
        )

    console.log('')

    console.log(
      '========================='
    )

    console.log('')

    console.log(
      'MULAI:',
      mulai
    )

    console.log('')

    console.log(
      'AUTOMATION SELESAI'
    )

    console.log('')

    console.log(
      'BATCH:',
      batchId
    )

    console.log('')

    console.log(
      `DURASI: ${menit} Menit ${detik} Detik`
    )

    console.log('')

    console.log(
      'SELESAI:',
      selesai
    )

    console.log('')

    console.log(
      '========================='
    )

  } finally {

    // =========================
    // STATUS SELESAI
    // =========================

    fs.writeFileSync(
      statusFile,
      JSON.stringify(
        {
          running: false
        },
        null,
        2
      )
    )

  }

})