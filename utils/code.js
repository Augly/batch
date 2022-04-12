/*
 * @Descripttion :
 * @version      :
 * @Author       : zero
 * @Date         : 2021-10-11 10:20:39
 * @LastEditors  : zero
 * @LastEditTime : 2021-10-19 11:13:25
 */
const fs = require('fs')
const path = require('path')
const CryptoJS = require('crypto-js')
function writeCode(params) {
  let pathStr = path.join(process.cwd(), `code`)
  fs.writeFileSync(
    pathStr + '/code.json',
    JSON.stringify({
      code: params,
    }),
    { recursive: true }
  )
  const _result = fs.readFileSync(pathStr + '/code.json').toString()
  if (_result) {
    return JSON.parse(_result).code
  } else {
    return false
  }
}
function removeCode(wpath) {
  let pathStr = wpath || path.join(process.cwd(), `code`)
  let files = fs.readdirSync(pathStr)
  for (var i = 0; i < files.length; i++) {
    let newPath = path.join(pathStr, files[i])
    let stat = fs.statSync(newPath)
    if (stat.isDirectory()) {
      //如果是文件夹就递归下去
      removeCode(newPath)
    } else {
      //删除文件
      fs.unlinkSync(newPath)
    }
  }
  fs.rmdirSync(pathStr) //如果文件夹是空的，就将自己删除掉
}
function readCode() {
  let pathStr = path.join(process.cwd(), `code`)
  if (!fs.existsSync(pathStr)) {
    fs.mkdirSync(pathStr, { recursive: true })
    fs.writeFileSync(
      pathStr + '/code.json',
      JSON.stringify({
        code: '',
      }),
      { recursive: true }
    )
    return false
  } else {
    const _result = fs.readFileSync(pathStr + '/code.json').toString()
    if (_result) {
      return JSON.parse(_result).code
    } else {
      return false
    }
  }
}
function Encrypt(word) {
  let key = 'EanjcvoruEvbB6Ru'
  let iv = ''
  key = CryptoJS.enc.Utf8.parse(key)
  iv = CryptoJS.enc.Utf8.parse(iv)
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })
  //返回base64
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}
function Decrypt(word) {
  let key = 'EanjcvoruEvbB6Ru'
  let iv = ''
  key = CryptoJS.enc.Utf8.parse(key)
  iv = CryptoJS.enc.Utf8.parse(iv)
  let base64 = CryptoJS.enc.Base64.parse(word)
  let src = CryptoJS.enc.Base64.stringify(base64)
  // 解密模式为CBC，补码方式为PKCS5Padding（也就是PKCS7）
  let decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })

  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
module.exports = {
  readCode,
  removeCode,
  writeCode,
  Encrypt,
  Decrypt,
}
