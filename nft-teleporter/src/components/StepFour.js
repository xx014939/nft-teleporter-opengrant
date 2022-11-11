import React, { useState } from 'react';
import '../index.css';
import '../styles/StepFour.css';
import completedBadge from '../assets/completedBadge.svg';
import infoSVG from '../assets/infoSVG.svg';
import copySVG from '../assets/copySVG.svg';
import walletIDSVG from '../assets/walletIDSVG.svg';
import keySVG from '../assets/keySVG.svg';
import axios from 'axios';
import Web3 from 'web3';

import ETHIcon from '../assets/eth-icon.svg'
import ETHGreyIcon from '../assets/eth-grey-icon.svg'

import POLYIcon from '../assets/poly-icon.svg'
import POLYGreyIcon from '../assets/poly-grey-icon.svg'

import BSCIcon from '../assets/bsc-icon.svg'
import BSCGreyIcon from '../assets/bsc-grey-icon.svg'
// const web3 = new Web3(Web3.givenProvider || "http://localhost:3000"); 
let web3 = new Web3(new Web3.providers.HttpProvider(
    'https://goerli.infura.io/v3/f6ea9a5670444f3b8f2221aa4d57149b'
));

// https://orbital-palpable-patina.bsc-testnet.discover.quiknode.pro/b313e9db5a5c399e10e42eb9ec68cf182f20de01/


let ABI = ''
let account = ''
let deployAllowed = false

function getCookie(cookieName) {
    let cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${cookieName}=`))
    ?.split('=')[1];
    console.log(cookieValue)

    return cookieValue;
}

function showSuccess () {
    document.querySelector('.step-four-success-container').style.display = 'block'
    document.getElementById('contractHash').innerHTML = `${getCookie('currentContractHash')}`

    document.getElementById('minting-section').style.display = 'block'
}

async function connectNewWallet(privateKey) {
    let result = await web3.eth.accounts.privateKeyToAccount(privateKey)  
    if (result) {
        web3.eth.accounts.wallet.add(privateKey)
    }
  }

async function deployContract() {

    // Start Loading Icon
    let loader = document.getElementById('loading-two')
    loader.classList.toggle('display')

    // Retrieve username
    let currentUsername = getCookie("currentUsername")
    // Ask for password
    let currentPassword = prompt("Please re-enter your password")
    // Make POST request to backend to retrieve keys
    let keysResponse = await axios.post(`https://shrouded-citadel-26581.herokuapp.com/users/keys`, {username: currentUsername, password: currentPassword})

    console.log('The keys are -->', keysResponse)
    console.log('The private key is -->', keysResponse.data.private_key[0])
    // Retrieve ABI & Bytecode from cookies
    ABI =  JSON.parse(getCookie("currentABI"))
    let bytecode = `0x${localStorage.getItem('currentBytecode').replace(/['"]+/g, '')}`

    console.log('THE ABI IS -->', ABI)
    console.log('THE Bytecode IS -->', bytecode)

    // Sign wallet in (if it's not already)
    connectNewWallet(`${keysResponse.data.private_key[0]}`)

    // Deploy contract using ABI + BYTECODE recieved from compile method 
    let accountList = await web3.eth.accounts.wallet;
    account = accountList[0].address

    let networkType = await web3.eth.net.getNetworkType()
    console.log('THE NETWORK TYPE IS -->', networkType)

    
    const { _address } = await new web3.eth.Contract(ABI).deploy({ data: `${bytecode}` }).send({from: account, gas: 5000000 });
    console.log('deploying', _address)
    document.cookie = 'currentContractHash=' + _address

    loader.classList.toggle('display') // Hide loading wheel

    showSuccess(); // Show completion certificate

    let hash = getCookie('collectionURIHash')

    // mintNFT(ABI, _address, account, hash)

}
  

async function compileContract() {
    console.log('working')
    let loader = document.getElementById('loading')
    loader.classList.toggle('display')

    let collectionNumber = `${parseInt(getCookie('currentCollectionCount'))}`
    let collectionName = `${getCookie('currentCollectionName')}`
    let collectionContract = `
    // SPDX-License-Identifier: MIT 
    pragma solidity ^0.8.17;
    import "Counters.sol";
    import "ERC721.sol";
    import "ERC721URIStorage.sol";
  
    contract HelloWorld is ERC721URIStorage { 
  
      using Counters for Counters.Counter; 
      Counters.Counter private _tokenIds;
  
      constructor() ERC721("${(collectionName).toString()}", "NFC") {
      }
  
      function createToken(string memory tokenURI) public returns (uint) {
          _tokenIds.increment();
          uint256 newItemId = _tokenIds.current();
  
          if (newItemId < ${parseInt(collectionNumber)}) {
              _mint(msg.sender, newItemId);
              _setTokenURI(newItemId, tokenURI);
          }
  
          return newItemId;
      }
  }
    `
    // Axios Post
    axios.post(`https://shrouded-citadel-26581.herokuapp.com/users/compile`, {
        smartContract: collectionContract
      })
      .then(res => {
        console.log(res)
        
        document.cookie = "currentABI=" + res.data.abi
        // document.cookie = "currentBytecode=" + res.data.bytecode
        localStorage.setItem('currentBytecode', res.data.bytecode);

        loader.classList.toggle('display')
        document.querySelector('.abi-bytecode-container').style.display = 'flex'
        document.getElementById('deploy-button').classList.remove('inactive-button')
        deployAllowed = true
      })
      .catch(function (error) {
        console.log(error);
      });
}

function mintNFT(contract_abi, contract_address, account, hash) {
    const collectionBaseURI = `https://yourmetaworld.mypinata.cloud/ipfs/${hash}/{id}.json`
    const userContract = new web3.eth.Contract(contract_abi, contract_address);
    userContract.methods.createToken(`${collectionBaseURI}`).send({from: account, gas: 5000000 })
    console.log('done', collectionBaseURI)
}

async function getUserBalance(chainID) {
    // Retrieve username
    let currentUsername = getCookie("currentUsername")
    // Ask for password
    let currentPassword = prompt("Please re-enter your password")

    let keysResponse = await axios.post(`https://shrouded-citadel-26581.herokuapp.com/users/keys`, {username: currentUsername, password: currentPassword})
    // Sign wallet in (if it's not already)
    connectNewWallet(`${keysResponse.data.private_key[0]}`)
    // Sign wallet in (if it's not already)
    connectNewWallet(`${keysResponse.data.private_key[0]}`)

    // Deploy contract using ABI + BYTECODE recieved from compile method 
    let accountList = await web3.eth.accounts.wallet;
    let walletAddress = accountList[0].address


    // let balance = await web3.eth.getBalance(walletAddress)
    // balance = (balance / 1000000000000000000).toFixed(2)
    // console.log('THE WALLET BALANCE IS -->', balance)

    const APIKEY = 'ckey_87d806dd3003422a8db15ca359d';
    const baseURL = 'https://api.covalenthq.com/v1'
    const blockchainChainId = `${chainID}` // Main net as test net is currently not supported

    const url = new URL(`${baseURL}/${blockchainChainId}/address/${walletAddress}/balances_v2/?key=${APIKEY}`);
    const response = await fetch(url);
    const result = await response.json();
    const data = result.data;
    console.log('WALLET BALANCE 2 IS -->', data)
    let balance = ((data.items[0].balance) / 1000000000000000000).toFixed(2)

    return balance
}


async function switchChain (chain, net) {
    console.log(`switch to the ${chain} chain`)
    if (net === 'TEST') {
        console.log('SWITCHED TO THE TESTNET')
        if (chain === 'ETH') {
            web3 = await new Web3(new Web3.providers.HttpProvider(
                'https://goerli.infura.io/v3/f6ea9a5670444f3b8f2221aa4d57149b'
            ));
        } else if (chain === 'BSC') {
            web3 = await new Web3(new Web3.providers.HttpProvider(
                'https://orbital-palpable-patina.bsc-testnet.discover.quiknode.pro/b313e9db5a5c399e10e42eb9ec68cf182f20de01/'
            ));
        } else if (chain === 'POLY') {
            web3 = await new Web3(new Web3.providers.HttpProvider(
                'https://polygon-mumbai.infura.io/v3/f6ea9a5670444f3b8f2221aa4d57149b'
            ));
        }
    } else {
        console.log('SWITCHED TO THE MAINNET')
        if (chain === 'ETH') {
            web3 = await new Web3(new Web3.providers.HttpProvider(
                'https://goerli.infura.io/v3/f6ea9a5670444f3b8f2221aa4d57149b'
            ));
        } else if (chain === 'BSC') {
            web3 = await new Web3(new Web3.providers.HttpProvider(
                'https://orbital-palpable-patina.bsc-testnet.discover.quiknode.pro/b313e9db5a5c399e10e42eb9ec68cf182f20de01/'
            ));
        } else if (chain === 'POLY') {
            web3 = await new Web3(new Web3.providers.HttpProvider(
                'https://polygon-mumbai.infura.io/v3/f6ea9a5670444f3b8f2221aa4d57149b'
            ));
        }
    }


    // getUserBalance()

    document.getElementById('deploy-button').classList.add('inactive-button')
    deployAllowed = false
}

const activateChainBtn = event => {
    let allBtns = document.querySelectorAll('.chain-button')
    for (let i = 0; i < allBtns.length; i ++) {
        if (allBtns[i] === event.currentTarget) {
            allBtns[i].classList.add('step-four-chain-selection-button-bg--active')
            allBtns[i].classList.remove('step-four-chain-selection-button-bg--inactive')
        } else {
            allBtns[i].classList.remove('step-four-chain-selection-button-bg--active')
            allBtns[i].classList.add('step-four-chain-selection-button-bg--inactive')
        }
    }
}

function copyToClipboard (string) {
    let textToCopy = `${string}`
    navigator.clipboard.writeText(textToCopy)
}

function SuccessfulDeploy () {
    return (
        <div className="successful-deploy-container">
            <div className="successful-deploy-inner-container">
                <div className="successful-deploy-header">
                    <div><img src={completedBadge} alt="Deployed Smart Contract"/></div>
                    <div>Your Contract has been deployed!</div>
                </div>
                <div className="successful-deploy-body">
                    <div className='successful-deploy-info-label-container'>
                        <div style={{marginRight: '7px'}}><img src={infoSVG} alt=""/></div>
                        <div>Please view your transaction hash below</div>
                    </div>
                    <div className="successful-deploy-transaction-id-container">
                        <div id="contractHash">628301fb10b951006405ba3f</div>
                        <div className='copy-button-container'>
                            <div><img src={copySVG} alt=""/></div>
                            <div>Copy</div>
                        </div>
                    </div>
                    <a className='view-experiences-button' href='/experiences'>
                        View your NFT Experiences here
                    </a>
                </div>
            </div>
        </div>
    )
}

function generateMintingPortal() {

let currentContractHash = getCookie('currentContractHash')
let currentMetadataHash = getCookie('collectionURIHash')
    
let moralisMintingPortal = `
<!DOCTYPE html>
<html>
  <head>
    <title>Vanilla Boilerplate</title>
    <script src="https://unpkg.com/moralis-v1/dist/moralis.js"></script>
    <script src="https://www.jsdelivr.com/package/gh/ethereum/web3.js"></script>
  </head>

  <body>
    <h1>Moralis Hello World!</h1>

    <button id="btn-login">Moralis Metamask Login</button>
    <button id="btn-logout">Logout</button>
    <button onclick="contractCall()">How Many NFT's do I have?</button>
	<button onclick="donate()">Mint</button>

  </body>
  <script>
    /* Moralis init code */
    const serverUrl = "https://hpz4yq50hr8y.usemoralis.com:2053/server";
    const appId = "FaLY0U96izeaTHPkmvxHUq87YIejSYU0KMBiHS5M";
    Moralis.start({ serverUrl, appId });

    const ABI = ${getCookie('currentABI')}
    
    /* Authentication code */
    async function login() {
        let user = Moralis.User.current();
        if (!user) {
        user = await Moralis.authenticate({
            signingMessage: "Log in using Moralis",
        })
            .then(function (user) {
            console.log("logged in user:", user);
            console.log(user.get("ethAddress"));
            })
            .catch(function (error) {
            console.log(error);
            });
        }
    }
    
    async function logOut() {
        await Moralis.User.logOut();
        console.log("logged out");
    }

    async function contractCall() {

	let user = Moralis.User.current();
	
    const options = {
        chain: "goerli",
        address: ${currentContractHash},
        function_name: "balanceOf",
        abi: ABI,
        params: { owner: user.get("ethAddress") },
        };
        const allowance = await Moralis.Web3API.native.runContractFunction(options);
        console.log(allowance)
    }
    
    document.getElementById("btn-login").onclick = login;
    document.getElementById("btn-logout").onclick = logOut;

	async function donate() {
        let options = {
          contractAddress: ${currentContractHash},
          functionName: "createToken",
          abi: ABI,
          params: {
            tokenURI: https://yourmetaworld.mypinata.cloud/ipfs/${currentMetadataHash}/{id}.json,
          }
        };
        await Moralis.executeFunction(options)
      }
  </script>
</html>
`

return (moralisMintingPortal)
}

function StepFour () {

    const [net, setNet] = useState('TEST');
    const [currentBalance, setCurrentBalance] = useState(0)
    const [currentChain, setCurrentChain] = useState('ETH')

    function makeCompileActive() {
        document.getElementById('compileButton').classList.remove('inactive-button')
    }

    return (
        <div className='page-container--255 step-four-container'>
            <div className='step-four-title'><h2>Smart Contract</h2></div>
            <div className='step-four-input-container' style={{display: 'none'}}>
                <div className='step-four-input-label'>Treasury Public Wallet Address</div>
                <div className='step-four-input-subcontainer'>
                    <div><img src={walletIDSVG} alt=""/></div>
                    <input type="text" placeholder='Wallet Address'></input>
                </div>
            </div>
            <div className='step-four-input-container' style={{marginTop: '38px', display: 'none'}}>
                <div className='step-four-input-label'>Treasury Private Wallet Key</div>
                <div className='step-four-input-subcontainer'>
                    <div><img src={keySVG} alt=""/></div>
                    <input type="text" placeholder='Private Wallet Address'></input>
                </div>
            </div>
            <div className='step-four-input-label'>Choose Your Net</div>
            <div className='net-balance-container'>
                <div style={{marginBottom: '20px'}}>
                    <div>Mainnet/Testnet</div>
                    <label class="switch">
                        <input type="checkbox" defaultChecked onClick={() => {console.log('triggering'); if (net === 'TEST'){setNet('MAIN')} else {setNet('TEST')}}}/>
                        <span class="slider round"></span>
                    </label>
                </div>
                <div className='current-balance-container'>
                    <span>Current Balance</span>
                    <div><span>{currentBalance}</span><span> {currentChain}</span></div>
                </div>
            </div>
            <div className='step-four-chain-selection-container'>
                <div className='step-four-input-label'>Which Chain Would You Like to Deploy With?</div>
                <div className='step-four-chain-selection-button-container'>
                <div id='eth-btn' className='step-four-chain-selection-button-bg--inactive chain-button' onClick={async (event) => {switchChain('ETH', net); activateChainBtn(event); let balance = await getUserBalance('5'); setCurrentBalance(balance); setCurrentChain('ETH'); makeCompileActive()}}>
                    <div className='step-four-chain-selection-button'>
                        <div className='active-icon'><img src={ETHIcon}/></div>
                        <div className='inactive-icon'><img src={ETHGreyIcon}/></div>
                        <div>ETH</div>
                    </div>
                </div>
                <div id='bsc-btn' className='step-four-chain-selection-button-bg--inactive chain-button' onClick={async (event) => {switchChain('BSC', net); activateChainBtn(event); let balance = await getUserBalance('97'); setCurrentBalance(balance); setCurrentChain('BSC'); makeCompileActive()}}>
                    <div className='step-four-chain-selection-button'>
                        <div className='active-icon'><img src={BSCIcon}/></div>
                        <div className='inactive-icon'><img src={BSCGreyIcon}/></div>
                        <div>BSC</div>
                    </div>
                </div>
                <div id='poly-btn' className='step-four-chain-selection-button-bg--inactive chain-button' onClick={async (event) => {switchChain('POLY', net); activateChainBtn(event); let balance = await getUserBalance('80001'); setCurrentBalance(balance); setCurrentChain('MATIC'); makeCompileActive()}}>
                    <div className='step-four-chain-selection-button'>
                        <div className='active-icon'><img src={POLYIcon} style={{minWidth: '60px', marginRight: '0px'}}/></div>
                        <div className='inactive-icon'>< img src={POLYGreyIcon} style={{minWidth: '60px', marginRight: '0px'}}/></div>
                        <div>Polygon</div>
                    </div>
                </div>
                </div>
            </div>
            <div style={{marginTop: '40px'}} className='step-four-input-label'>Compile &amp; Deploy Your Smart Contract</div>
            <div onClick={() => {compileContract()}}>
                <div id='compileButton' className='view-experiences-button inactive-button' style={{padding: '17px 27px', textAlign: 'center', maxWidth: '560px'}} >
                    Compile Smart Contract
                </div>
            </div>

            <div className='loading-container'>
                <div id='loading'></div>
            </div>

            <div className='abi-bytecode-container'>
                <div className='abi-bytecode-element' onClick={() => {copyToClipboard(getCookie('currentABI'))}}>
                    <div>ABI</div>
                    <div><img src={copySVG}/></div>
                </div>
                <div className='abi-bytecode-element' onClick={() => {copyToClipboard(localStorage.getItem('currentBytecode'))}}>
                    <div>Bytecode</div>
                    <div><img src={copySVG}/></div>
                </div>
            </div>
            <div onClick={() => {if (deployAllowed) {deployContract()}}}>
                <div id='deploy-button' className='view-experiences-button inactive-button' style={{padding: '17px 27px', textAlign: 'center', maxWidth: '560px'}} >
                    Deploy Smart Contract
                </div>
            </div>

            <div className='loading-container'>
                    <div id='loading-two'></div>
            </div>
            <div className='step-four-success-container'>
                <SuccessfulDeploy/>
            </div>
            <div id="minting-section" style={{display: 'none'}}>
                <div style={{marginTop: '40px'}} className='step-four-input-label'>Mint Your Collection</div>
                <div onClick={() => {mintNFT(ABI, getCookie('currentContractHash'), account, getCookie('collectionURIHash'))}}>
                    <div className='view-experiences-button' style={{padding: '17px 27px', textAlign: 'center', maxWidth: '560px'}} >
                        Mint An NFT
                    </div>
                </div>
                <div>
                    <div style={{marginTop: '40px'}} className='step-four-input-label'>Embedd Minting Portal Onto Your Own Site?</div>
                    <div onClick={() => {copyToClipboard(generateMintingPortal())}}>
                    <div className='view-experiences-button' style={{padding: '17px 27px', textAlign: 'center', maxWidth: '560px'}} >
                        Copy Minting Portal Code
                    </div>
                </div>
                </div>
            </div>
        </div>
    ) 
}

export default StepFour;
