/*
 * @Descripttion : 
 * @version      : 
 * @Author       : zero
 * @Date         : 2022-04-12 12:32:46
 * @LastEditors  : zero
 * @LastEditTime : 2022-04-12 12:39:09
 */
const fs = require('fs')
const path = require('path')
const { writeLog } = require('./log')
const { web3 } = require('../web3/config')
async function getlist (limit = 10000) {
  let pathStr = path.join(process.cwd(), `json`)
  let list = []
  if (!fs.existsSync(pathStr + `/receive.txt`)) {
    fs.mkdirSync(pathStr, { recursive: true })
    fs.writeFileSync(
      pathStr + '/' + 'receive.txt',
      `接收账户
接收账户`
    )
    writeLog('请添加接收账户到/json/receive.txt,并重新启动程序')
    return false
  } else {
    let _str = fs
      .readFileSync(path.join(process.cwd(), 'json/receive.txt'))
      .toString()
    if (_str == '') {
      writeLog('请添加接收账户到/json/receive.txt,并重新启动程序')
      return false
    } else {
      if (_str) {
        list = Array.from(new Set(tranform(_str)))
      }
    }
  }
  if (list.length === 0) {
    writeLog('接收账号不能为空')
    return false
  }
  if (list.length > limit) {
    writeLog(`接收账户最多只能添加${limit}个,请删除多余账户私钥`)
    return false
  }
  try {
    return list
  } catch (error) {
    writeLog(`获取接收账户信息错误，错误信息:${error}`)
    return false
  }
}
function tranform (string) {
  let str = string.replace(/：/g, ':')
  str = str
    .replace(/，/g, ',')
    .replace(/\r/gi, '')
    .replace(/fo:/g, '-fo:')
    .replace(/；/g, ';')
  let list = str.split('\n'),
    dataList = []
  if (!list[list.length - 1]) {
    list.splice(list.length - 1, list.length)
  }
  for (let i = 0; i < list.length; i++) {
    dataList.push(list[i])
  }
  return dataList
}

module.exports = {
  getlist,
}
