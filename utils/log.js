/*
 * @Descripttion :
 * @version      :
 * @Author       : zero
 * @Date         : 2021-09-30 23:59:52
 * @LastEditors  : zero
 * @LastEditTime : 2021-10-14 17:53:59
 */
const fs = require('fs')
const os = require('os')
const path = require('path')
const moment = require('moment')
const logName = moment().format('YYYY-MM-DD HHmmss')
function writeLog(log) {
  let pathStr = path.join(process.cwd(), `logs`)
  if (!fs.existsSync(pathStr)) {
    fs.mkdirSync(pathStr)
  }
  if (typeof log === 'string') {
    if (log.indexOf('send') == -1) {
      console.log(`[Logs]${moment().format('YYYY-MM-DD HH:mm:ss')}：`, log)
    }
  }
  fs.appendFileSync(
    path.join(pathStr, `${logName}.txt`),
    `${os.EOL}${moment().format('YYYY-MM-DD HH:mm:ss')}：${log},`
  )
}
module.exports = {
  writeLog,
}
