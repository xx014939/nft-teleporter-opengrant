import React, { useState } from 'react';
import '../styles/ProgressBar.css';
import StepOne from './StepOne.js';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour'


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

    const [step, setStep] = useState("1");

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
            {step === "1" && <StepOne/>}
            {step === "2" && <StepTwo/>}
            {step === "3" && <StepThree/>}
            {step === "4" && <StepFour/>}
            <div className='continue-button-container'>
                <button className="continue-button" onClick={() => { updateCount(); updateElement(); setStep(`${counter}`)}}>Continue</button>
            </div>
        </div>
    </div>
 );
}

export default ProgressBar 