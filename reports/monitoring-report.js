const {

    getSummary,

    getReminderPegawai

} = require('../services/monitoring/monitoring-report')

console.log('\n========================')
console.log('MONITORING SIAPP')
console.log('========================')

console.table(
    getSummary()
)

console.log('\n========================')
console.log('REMINDER PER PEGAWAI')
console.log('========================')

console.table(
    getReminderPegawai()
)