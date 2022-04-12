/*
 * @Descripttion :
 * @version      :
 * @Author       : zero
 * @Date         : 2021-10-09 10:34:04
 * @LastEditors  : zero
 * @LastEditTime : 2022-04-10 10:58:35
 */
const fs = require('fs')
const path = require('path')
const { writeLog } = require('./log')
const { Encrypt, Decrypt } = require('./code')
const { web3 } = require('../web3/config')
const guid = require('./deviceid')
async function getAccount (limit = 10000) {
  const deviceid = (await guid()) || 'qiuyiyang'
  let pathStr = path.join(process.cwd(), `json`)
  let keyPath = path.join(process.cwd(), `key`)
  let list = []
  if (!fs.existsSync(pathStr + `/account.txt`)) {
    fs.mkdirSync(pathStr, { recursive: true })
    fs.writeFileSync(
      pathStr + '/' + 'account.txt',
      `密钥
密钥`
    )
    writeLog('请添加密钥到/json/account.txt,并重新启动程序')
    return false
  } else {
    let _str = fs
      .readFileSync(path.join(process.cwd(), 'json/account.txt'))
      .toString()
    if (_str == '') {
      if (fs.existsSync(keyPath + `/account.txt`)) {
        let accConfig = fs
          .readFileSync(path.join(process.cwd(), 'key/account.txt'))
          .toString()
        if (accConfig) {
          list = JSON.parse(Decrypt(accConfig).split(`;${deviceid}`)[0])
        } else {
          writeLog('请添加密钥到/json/account.txt,并重新启动程序')
          return false
        }
      } else {
        writeLog('请添加密钥到/json/account.txt,并重新启动程序')
        return false
      }
    } else {
      if (_str) {
        list = Array.from(new Set(tranform(_str)))
      }
    }
  }
  if (list.length === 0) {
    writeLog('账号不能为空')
    return false
  }
  if (list.length > limit) {
    writeLog(`账户最多只能添加${limit}个,请删除多余账户私钥`)
    return false
  }
  try {
    for (let i = 0; i < list.length; i++) {
      web3.eth.accounts.privateKeyToAccount(list[i])
    }
    fs.mkdirSync(keyPath, { recursive: true })
    fs.writeFileSync(
      keyPath + '/' + 'account.txt',
      Encrypt(JSON.stringify(list) + `;${deviceid}`)
    )
    fs.writeFileSync(pathStr + '/' + 'account.txt', ``)
    return list
  } catch (error) {
    writeLog(`获取账户信息错误，错误信息:${error}`)
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
  getAccount,
}
