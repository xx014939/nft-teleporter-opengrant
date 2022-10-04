import '../index.css';
import '../styles/StepFour.css';
import completedBadge from '../assets/completedBadge.svg';
import infoSVG from '../assets/infoSVG.svg';
import copySVG from '../assets/copySVG.svg';
import walletIDSVG from '../assets/walletIDSVG.svg';
import keySVG from '../assets/keySVG.svg';
import axios from 'axios';
// import { compileContract } from '../../../server/controllers/userController';

function showSuccess () {
    document.querySelector('.step-four-success-container').style.display = 'block'
}

async function compileContract() {
    console.log('working')
    let collectionNumber = 4
    let collectionName = 'test'
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
        console.log('THE ABI IS HERE -->', res.data.abi)
        console.log('working!!!')
      })
      .catch(function (error) {
        console.log(error);
      });
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
                    Send Custom Contract to Server
                </div>
            </div>
            <div onClick={showSuccess}>
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