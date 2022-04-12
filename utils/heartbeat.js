/*
 * @Descripttion :
 * @version      :
 * @Author       : zero
 * @Date         : 2021-10-19 10:54:50
 * @LastEditors  : zero
 * @LastEditTime : 2021-10-20 15:52:47
 */
const request = require('axios')
const { Decrypt, readCode } = require('./code')
const api = 'http://gamefiapi.sugargamefi.com/api/v1'
// const api = 'http://192.168.31.5:9999/api/v1'
async function heartbeat(activeCode) {
  let limit = 1,
    status = 0
  try {
    const _ruselt = await request.get(api + '/queryCode', {
      params: {
        activeCode: activeCode || Decrypt(readCode()),
      },
    })
    if (_ruselt && _ruselt.data) {
      limit = _ruselt.data.Data.UseLimit
      status = _ruselt.data.Data.ActiveState
      return {
        limit,
        status,
      }
    } else {
      return {
        limit,
        status,
      }
    }
  } catch (error) {
    return {
      limit,
      status,
    }
  }
}
module.exports = {
  heartbeat,
}
