/*
 * @Descripttion :
 * @version      :
 * @Author       : zero
 * @Date         : 2021-10-05 17:40:12
 * @LastEditors  : zero
 * @LastEditTime : 2021-10-18 11:58:48
 */
const { machineIdSync } = require('node-machine-id')
module.exports = function () {
  return machineIdSync()
}
