import Web3 from 'web3';
import * as wrapper from 'solc/wrapper';
// const solc = wrapper(window.Module);

const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");
const web3Two = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/f6ea9a5670444f3b8f2221aa4d57149b"))

function connectRPC () {
    console.log('RPC')
    console.log('first -->',web3.eth.accounts)
    console.log('next -->', web3Two.eth.accounts)
}


var input = {
    language: 'Solidity',
    sources: {
      'test.sol': {
        content: 'contract C { function f() public { } }'
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };
  
function GenerateETHWallet () {
    return (
        <div>
            <button onClick={() => {console.log(web3.eth.accounts.create())}}>GENERATE ETH WALLET</button>
            <button onClick={() => {connectRPC()}}>CONNECT TO RPC</button>
            {/* <button onClick={() => {  var output = JSON.parse(solc.compile(JSON.stringify(input))); console.log(output)}}>COMPILE CONTRACT</button> */}
        </div>
    )
}

export default GenerateETHWallet;