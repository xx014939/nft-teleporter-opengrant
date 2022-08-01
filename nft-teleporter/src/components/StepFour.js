import '../index.css';
import '../styles/StepFour.css';
import completedBadge from '../completedBadge.svg';
import infoSVG from '../infoSVG.svg';
import copySVG from '../copySVG.svg';

function SuccessfulDeploy () {
    return (
        <div className="successful-deploy-container">
            <div className="successful-deploy-inner-container">
                <div className="successful-deploy-header">
                    <div><img src={completedBadge}/></div>
                    <div>Your Contract has been deployed!</div>
                </div>
                <div className="successful-deploy-body">
                    <div>
                        <div><img src={infoSVG}/></div>
                        <div>Your Contract has been deployed!</div>
                    </div>
                    <div className="successful-deploy-transaction-id-container">
                        <div>628301fb10b951006405ba3f</div>
                        <div>
                            <div><img src={copySVG}/></div>
                            <div>Copy</div>
                        </div>
                    </div>
                    <div>View your NFT Experiences here</div>
                </div>
            </div>
        </div>
    )
}

function StepFour () {
    return (
        <div>
            <SuccessfulDeploy/>
        </div>
    ) 
}

export default StepFour;