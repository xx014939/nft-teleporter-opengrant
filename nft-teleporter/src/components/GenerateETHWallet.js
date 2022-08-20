import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");


function GenerateETHWallet () {
    return (
        <div>
            <button onClick={() => {console.log(web3.eth.accounts.create())}}>GENERATE ETH WALLET</button>
        </div>
    )
}

export default GenerateETHWallet;