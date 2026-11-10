const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')

const client = new Client({

    authStrategy: new LocalAuth({

        clientId: 'siapp-monitoring'

    }),

    puppeteer: {

        headless: false,

        args: [

            '--no-sandbox',

            '--disable-setuid-sandbox'

        ]

    }

})

// ========================
// QR CODE
// ========================

client.on('qr', (qr) => {

    console.log('')
    console.log('===================================')
    console.log('SCAN QR WHATSAPP')
    console.log('===================================')

    qrcode.generate(qr, {

        small: true

    })

})

// ========================
// READY
// ========================

client.on('ready', () => {

    console.log('')
    console.log('===================================')
    console.log('WHATSAPP READY')
    console.log('===================================')

})

// ========================
// AUTH
// ========================

client.on('authenticated', () => {

    console.log('WhatsApp authenticated.')

})

// ========================
// AUTH FAIL
// ========================

client.on('auth_failure', msg => {

    console.log('Auth failure :', msg)

})

// ========================
// DISCONNECTED
// ========================

client.on('disconnected', reason => {

    console.log('Disconnected :', reason)

})

module.exports = client