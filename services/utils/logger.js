const fs = require('fs')
const path = require('path')

const logFile = path.join(
  __dirname,
  '../../logs/automation.log'
)

function log(...args) {

  const text = args.join(' ')

  console.log(text)

  fs.appendFileSync(
    logFile,
    text + '\n'
  )

}

function clearLog() {

  fs.writeFileSync(
    logFile,
    ''
  )

}

module.exports = {
  log,
  clearLog
}