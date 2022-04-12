/*
 * @Descripttion :
 * @version      :
 * @Author       : zero
 * @Date         : 2021-10-08 15:20:52
 * @LastEditors  : zero
 * @LastEditTime : 2022-04-12 13:41:38
 */
const Web3 = require('web3')
const web3 = new Web3('https://bsc-dataseed4.ninicoin.io')
const Token = '0x0C8daC6C91B43bb7242C93975E7c35e258254037'
const Token_abi = require('../abi/index')
const BNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
const USDT = '0x55d398326f99059fF775485246999027B3197955'
const Factocy_abi = require('../abi/factory')
const Pair_abi = require('../abi/pair')
const PancakSwap_adder = '0x10ED43C718714eb63d5aA57B78B54704E256024E'
const pancakeAbi = require('../abi/pancakeRouter')
const common_abi = require('../abi/common')
const batchAbi = require('../abi/batch')
const common_Contract = new web3.eth.Contract(common_abi.abi, USDT)
const PancakSwap_Contract = new web3.eth.Contract(pancakeAbi.abi, PancakSwap_adder)
const Token_Contract = new web3.eth.Contract(Token_abi.abi, Token)
module.exports = {
  web3,
  Token,
  Token_abi,
  Token_Contract,
  BNB,
  USDT,
  PancakSwap_adder,
  pancakeAbi,
  Factocy_abi,
  PancakSwap_Contract,
  Pair_abi,
  common_abi,
  common_Contract,
  batchAbi
}
