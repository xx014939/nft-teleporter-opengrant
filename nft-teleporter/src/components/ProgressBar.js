import '../styles/ProgressBar.css';
import StepOne from './StepOne.js'

let counter = 1;

function updateCount () {
    counter = counter + 1;
}

function updateElement () {
    let elementArray = document.querySelectorAll('.progress-bar-element')
    for (let i = 0; i < counter; i++) {
        elementArray[i].classList.add('active-element')
    }
}

function ProgressBar () {
 return (
    <div>
        <div className="progress-bar-container">
         <div className="progress-bar-step">
            <div className="progress-bar-element active-element">1</div>
            <div className="progress-bar-text">Basic Info</div>
         </div>
         <div style={{width: '100%', height: "2px", background: "#ffffff", marginTop: "30px"}}></div>
         <div className="progress-bar-step">
            <div className="progress-bar-element">2</div>
            <div className="progress-bar-text">Digital Assets</div>
         </div>
         <div style={{width: '100%', height: "2px", background: "#ffffff", marginTop: "30px"}}></div>
         <div className="progress-bar-step" style={{marginBottom: '16px', marginRight: '-8px', marginLeft: '-8px'}}>
            <div className="progress-bar-element">3</div>
            <div className="progress-bar-text">Blockchains</div>
         </div>
         <div style={{width: '100%', height: "2px", background: "#ffffff", marginTop: "30px"}}></div>
         <div className="progress-bar-step">
            <div className="progress-bar-element">4</div>
            <div className="progress-bar-text">Smart Contract</div>
         </div>
        </div>
        <div>
            <StepOne/>
            <div className='continue-button-container'>
                <button className="continue-button" onClick={() => { updateCount(); updateElement();}}>Continue</button>
            </div>
        </div>
    </div>
 );
}

export default ProgressBar 