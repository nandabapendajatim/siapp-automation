const {

    generateMonitoringWA

} = require('./services/monitoring/monitoring-wa')

const text =
    generateMonitoringWA()

console.log(text)