/*
 * @Descripttion :
 * @version      :
 * @Author       : zero
 * @Date         : 2021-10-09 11:00:28
 * @LastEditors  : zero
 * @LastEditTime : 2022-04-12 14:16:21
 */
const { web3 } = require('./config')
const { writeLog } = require('../utils/log')
async function send (
  Contract,
  contarctAddress,
  method,
  params,
  account,
  callback,
  errorback
) {
  try {
    const gas = await Contract.methods[method](...params).estimateGas({
      to: contarctAddress,
      from: account,
    })
    const getGasPrice = await web3.eth.getGasPrice()
    const result = await Contract.methods[method](...params).send({
      from: account,
      gas: (gas * 1.2).toString(),
      gasPrice: parseInt(getGasPrice * 1.05).toString(),
    })
    callback && callback(result)
    return result
  } catch (error) {
    console.log(error)
    writeLog(`send方法报错`)
    errorback && errorback()
    return false
  }
}

async function call (Contract, method, params, callback, errorback) {
  try {
    const result = await Contract.methods[method](...params).call({})
    callback && callback(result)
    return result
  } catch (e) {
    writeLog(`call方法报错，错误信息为${e}`)
    errorback && errorback(e)
    return false
  }
}

async function accountCall (
  Contract,
  method,
  params,
  account,
  callback,
  errorback
) {
  try {
    const result = await Contract.methods[method](...params).call({
      from: account,
    })
    callback && callback(result)
    return result
  } catch (e) {
    writeLog(`call方法报错，错误信息为${e}`)
    errorback && errorback(e)
    return false
  }
}

module.exports = {
  send,
  call,
  accountCall,
}
