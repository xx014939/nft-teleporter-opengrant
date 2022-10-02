import Web3 from 'web3';
// import * as wrapper from 'solc/wrapper';
// const solc = wrapper(window.Module);


/* COMPILE AND DEPLOY CONTRACT */
const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = ''; 
const providerOrUrl = 'https://rinkeby.infura.io/v3/f6ea9a5670444f3b8f2221aa4d57149b';

const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");

let content = 
`
/* SPDX-License-Identifier: UNLICENSED */
pragma solidity >=0.7.0 <0.9.0;
contract MyContract {
  address private owner;
  string name;
  constructor() {
    owner = msg.sender;
  }
  function changeName(string memory newName) public {
    name = newName;
  }
  function showName() public view returns(string memory) {
    return name;
  }
}
`

const input = {
    language: 'Solidity',
    sources: {
      'MyContract.sol': { content }
    },
    settings: {
      outputSelection: { '*': { '*': ['*'] } }
    }
  };

// Deploy smart contract
const deploySmartContract = async () => {

  //   /* 1. Get Ethereum Account */
  //   const [account] = await web3.eth.getAccounts();
  //   console.log(account)
    
  //   /* 2. Compile Smart Contract */
  //   const {contracts} = JSON.parse(
  //   solc.compile(JSON.stringify(input))
  // );

  // const contract = contracts['MyContract.sol'].MyContract;

  //   /* 2. Extract Abi And Bytecode From Contract */
  //   const abi = contract.abi;
  //   const bytecode = contract.evm.bytecode.object;
  
  //   /* 3. Send Smart Contract To Blockchain */
  //   // const { _address } = await new web3.eth.Contract(abi)
  //   //   .deploy({ data: bytecode })
  //   //   .send({from: account, gas: 1000000 });
  
  //   console.log("Contract Address =>", abi, bytecode);
  console.log('deploying')
  }


async function generateNewWallet() {
  let newWallet = await web3.eth.accounts.create()
  console.log('New wallet is -->', newWallet)
  console.log('PRIVATE KEY -->', newWallet.privateKey)
}

async function connectNewWallet(privateKey) {

  console.log('All wallets -->', web3.eth.accounts.wallet)

  let result = await web3.eth.accounts.privateKeyToAccount(privateKey)
  console.log('The result is - ', result)


  console.log('All wallets -->', web3.eth.accounts.wallet)

  let secondResult = await web3.eth.accounts.wallet.add(privateKey)
  console.log('The second result is - ', secondResult)
}


  
function GenerateETHWallet () {
    return (
        <div>
            <button onClick={() => {console.log(web3.eth.accounts.create())}}>GENERATE ETH WALLET</button>
            <button onClick={() => {generateNewWallet()}}>Generate 2</button>
            <button onClick={() => {connectNewWallet('0x119edc54c8be0cc39fa15f5cf09a6ca38013b93c0a506f90c6d9d2a1b2872deb')}}>Sign In</button>
            <button onClick={deploySmartContract}>DEPLOY</button>
        </div>
    )
}

export default GenerateETHWallet;