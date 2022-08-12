import '../index.css';
import '../styles/StepFour.css';
import completedBadge from '../completedBadge.svg';
import infoSVG from '../infoSVG.svg';
import copySVG from '../copySVG.svg';
import walletIDSVG from '../walletIDSVG.svg'
import keySVG from '../keySVG.svg'

function showSuccess () {
    document.querySelector('.step-four-success-container').style.display = 'block'
}

function SuccessfulDeploy () {
    return (
        <div className="successful-deploy-container">
            <div className="successful-deploy-inner-container">
                <div className="successful-deploy-header">
                    <div><img src={completedBadge}/></div>
                    <div>Your Contract has been deployed!</div>
                </div>
                <div className="successful-deploy-body">
                    <div className='successful-deploy-info-label-container'>
                        <div style={{marginRight: '7px'}}><img src={infoSVG}/></div>
                        <div>Please view your transaction hash below</div>
                    </div>
                    <div className="successful-deploy-transaction-id-container">
                        <div>628301fb10b951006405ba3f</div>
                        <div className='copy-button-container'>
                            <div><img src={copySVG}/></div>
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
                    <div><img src={walletIDSVG}/></div>
                    <input type="text" placeholder='Wallet Address'></input>
                </div>
            </div>
            <div className='step-four-input-container' style={{marginTop: '38px'}}>
                <div className='step-four-input-label'>Treasury Private Wallet Key</div>
                <div className='step-four-input-subcontainer'>
                    <div><img src={keySVG}/></div>
                    <input type="text" placeholder='Private Wallet Address'></input>
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