const {

    getSummary,

    getReminderPegawai,

    getReminderList

} = require('../services/monitoring/monitoring-report')

const exportMonitoring =
    require('../services/monitoring/monitoring-export')

async function run() {

    await exportMonitoring({

        summary:
            getSummary(),

        reminderPegawai:
            getReminderPegawai(),

        reminderList:
            getReminderList()

    })

}

run()