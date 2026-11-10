const {
    getReminderPegawai
} = require('./monitoring-report')

function formatTanggal() {

    const now = new Date()

    return now.toLocaleString('id-ID', {

        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'

    })

}

function generateMonitoringWA() {

    const rows =
        getReminderPegawai()

    let text = ''

    text += '📢 *REMINDER PENSTATUSAN SIAPP*\n'
    text += `_Per ${formatTanggal()} WIB_\n\n`

    for (const r of rows) {

        text += '━━━━━━━━━━━━━━━━━━━━━━\n'
        text += `👤 *${r.pegawai}*\n\n`

        if (r.spos7 + r.npp7 + r.ntp7 > 0)
            text += `📄 +7 Hari  : ${r.spos7 + r.npp7 + r.ntp7} SK\n`

        if (r.spos8 + r.npp8 + r.ntp8 > 0)
            text += `📄 +8 Hari  : ${r.spos8 + r.npp8 + r.ntp8} SK\n`

        if (r.spos9 + r.npp9 + r.ntp9 > 0)
            text += `📄 +9 Hari  : ${r.spos9 + r.npp9 + r.ntp9} SK\n`

        if (r.spos10 + r.npp10 + r.ntp10 > 0)
            text += `📄 +10 Hari : ${r.spos10 + r.npp10 + r.ntp10} SK\n`

        text += `\n📌 *Total : ${r.total} SK*\n`

    }

    text += '━━━━━━━━━━━━━━━━━━━━━━\n\n'

    text +=
        '*⚠️ Mohon segera ditindaklanjuti agar tidak melewati batas waktu penstatusan SIAPP.*\n\n'

    text +=
        '*Terima kasih.*'

    return text

}

module.exports = {

    generateMonitoringWA

}