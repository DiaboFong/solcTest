const path = require('path');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

//1. 获取ByteCode
const  contractPath = path.resolve(__dirname,'../compiled/Car.json');
const {interface ,bytecode} = require(contractPath);

//2. 配置Provider
const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8545');


(async () => {
    //4.获取钱包里面的账户
    const accounts = await web3.eth.getAccounts();
    console.log('部署合约的账户:',accounts[0]);

    //5.创建合约实例并且部署
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: '0x'+bytecode, arguments:['BMW']})
        .send({from:accounts[0],gas:'400000'});

    console.log('合约部署成功',result)
})();


