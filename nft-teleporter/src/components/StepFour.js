import '../index.css';
import '../styles/StepFour.css';
import completedBadge from '../assets/completedBadge.svg';
import infoSVG from '../assets/infoSVG.svg';
import copySVG from '../assets/copySVG.svg';
import walletIDSVG from '../assets/walletIDSVG.svg';
import keySVG from '../assets/keySVG.svg';
import axios from 'axios';
import Web3 from 'web3';
// const web3 = new Web3(Web3.givenProvider || "http://localhost:3000"); 
var web3 = new Web3(new Web3.providers.HttpProvider(
    'https://goerli.infura.io/v3/f6ea9a5670444f3b8f2221aa4d57149b'
));

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
}

async function connectNewWallet(privateKey) {
    let result = await web3.eth.accounts.privateKeyToAccount(privateKey)  
    if (result) {
        web3.eth.accounts.wallet.add(privateKey)
    }
  }

async function deployContract() {
    // Retrieve username
    let currentUsername = getCookie("currentUsername")
    // Ask for password
    let currentPassword = prompt("Please re-enter your password")
    // Make POST request to backend to retrieve keys
    let keysResponse = await axios.post(`http://localhost:5000/users/keys`, {username: currentUsername, password: currentPassword})

    console.log('The keys are -->', keysResponse)
    console.log('The private key is -->', keysResponse.data.private_key[0])
    // Retrieve ABI & Bytecode from cookies
    let ABI =  JSON.parse(getCookie("currentABI"))
    let bytecode = `0x${localStorage.getItem('currentBytecode').replace(/['"]+/g, '')}`

    console.log('THE ABI IS -->', ABI)
    console.log('THE Bytecode IS -->', bytecode)

    // Sign wallet in (if it's not already)
    connectNewWallet(`${keysResponse.data.private_key[0]}`)

    // Deploy contract using ABI + BYTECODE recieved from compile method 
    let accountList = await web3.eth.accounts.wallet;
    let account = accountList[0].address

    let networkType = await web3.eth.net.getNetworkType()
    console.log('THE NETWORK TYPE IS -->', networkType)

    
    const { _address } = await new web3.eth.Contract(ABI).deploy({ data: `${bytecode}` }).send({from: account, gas: 5000000 });
    console.log('deploying', _address)

    // Show completion certificate
    showSuccess(); 

    let hash = getCookie('collectionURIHash')

    mintNFT(ABI, _address, account, hash)

}
  

async function compileContract() {
    console.log('working')
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
    axios.post(`http://localhost:5000/users/compile`, {
        smartContract: collectionContract
      })
      .then(res => {
        console.log(res)
        
        document.cookie = "currentABI=" + res.data.abi
        // document.cookie = "currentBytecode=" + res.data.bytecode
        localStorage.setItem('currentBytecode', res.data.bytecode);
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
                        <div>628301fb10b951006405ba3f</div>
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

function StepFour () {
    return (
        <div className='page-container--255 step-four-container'>
            <div className='step-four-title'><h2>Smart Contract</h2></div>
            <div className='step-four-input-container'>
                <div className='step-four-input-label'>Treasury Public Wallet Address</div>
                <div className='step-four-input-subcontainer'>
                    <div><img src={walletIDSVG} alt=""/></div>
                    <input type="text" placeholder='Wallet Address'></input>
                </div>
            </div>
            <div className='step-four-input-container' style={{marginTop: '38px'}}>
                <div className='step-four-input-label'>Treasury Private Wallet Key</div>
                <div className='step-four-input-subcontainer'>
                    <div><img src={keySVG} alt=""/></div>
                    <input type="text" placeholder='Private Wallet Address'></input>
                </div>
            </div>
            <div onClick={() => {compileContract()}}>
                <div className='view-experiences-button' style={{padding: '17px 27px', textAlign: 'center'}} >
                    Compile Smart Contract
                </div>
            </div>
            <div onClick={() => {deployContract()}}>
                <div className='view-experiences-button' style={{padding: '17px 27px', textAlign: 'center'}} >
                    Deploy Smart Contract
                </div>
            </div>
            <div className='step-four-success-container'>
                <SuccessfulDeploy/>
            </div>
        </div>
    ) 
}

export default StepFour;