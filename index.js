/*
 * @Descripttion :
 * @version      :
 * @Author       : zero
 * @Date         : 2021-10-18 12:01:07
 * @LastEditors  : zero
 * @LastEditTime : 2022-04-12 14:25:28
 */
const { web3,
  BNB,
  USDT,
  PancakSwap_adder,
  pancakeAbi,
  common_abi,
  common_Contract,
  batchAbi,
  PancakSwap_Contract
} = require('./web3/config')
const { send, call } = require('./web3/index')
const { getAccount } = require('./utils/getAccount')
const { getlist } = require('./utils/getlist')
const readlineSync = require('readline-sync')
const { writeLog } = require('./utils/log')
const decimal = 6
const batchContract_address = '0x12B397c05837DE9d4586bE9F2214dE4a8A563744'
let _number = ''
let Token = ''
//授权
async function ap () {
  web3.eth.accounts.wallet.clear()
  const list = await getAccount()
  if (!list) {
    return false
  }
  let allbalance = 0
  const common_Contract = new web3.eth.Contract(common_abi.abi, Token)
  for (let _i = 0; _i < list.length; _i++) {
    const account = web3.eth.accounts.privateKeyToAccount(list[_i])
    web3.eth.accounts.wallet.add(account)
    let _balance = await call(common_Contract, 'balanceOf', [account.address])
    writeLog(`账号${account.address}Token余额为: ${web3.utils.fromWei(_balance)}`)
    allbalance = Number(allbalance) + Number((_balance / 1000000000000000000).toFixed())
    async function run () {
      try {
        let _approve = await send(common_Contract, Token, 'approve', [batchContract_address,
          '150000000000000000000000000000'],
          account.address)
        if (_approve && _approve.status) {
          writeLog(`账户${account.address}授权成功！`)
        } else {
          writeLog(`账户${account.address}授权失败!`)
        }
      } catch (error) {
        writeLog(error)
      }
    }
    let balance = await call(common_Contract, 'allowance', [account.address, batchContract_address])
    if (balance < 1) {
      run()
    }
  }
  writeLog(allbalance)
}
async function batchTranser () {
  const list = await getAccount()
  if (!list) {
    return false
  }
  const receivelist = await getlist()
  if (!receivelist) {
    return false
  }
  let balances = []
  for (let i = 0; i < receivelist.length; i++) {
    balances.push(web3.utils.toWei(_number))
  }
  let batchContract = new web3.eth.Contract(
    batchAbi.abi,
    batchContract_address,
    {},
  );
  async function run (key) {
    const account = web3.eth.accounts.privateKeyToAccount(key)
    web3.eth.accounts.wallet.add(account)
    let _balance = await call(common_Contract, 'balanceOf', [account.address])
    if (_balance > 0) {
      let _result = await send(batchContract,
        batchContract_address,
        'multisendToken',
        [Token, receivelist, balances],
        account.address)
      if (_result && _result.status) {
        writeLog(`账户${account.address}批量转帐成功！`)
      } else {
        writeLog(`账户${account.address}批量转帐失败！`)
      }
    }
  }
  for (let _i = 0; _i < list.length; _i++) {
    run(list[_i])
  }
}
let index = readlineSync.keyInSelect(
  ['approve', 'batchTranser'],
  'Select Task'
)
Token = readlineSync.question('TokenContract:')
switch (index) {
  case 0:
    ap()
    break
  case 1:
    _number = readlineSync.question('number:')
    batchTranser()
    break
  default:
    process.exit(0)
    break
}

setInterval(() => { }, 60 * 60 * 10000)
