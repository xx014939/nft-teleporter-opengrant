import React, { useState } from 'react';
import '../styles/ProgressBar.css';
import tick from '../assets/tick.svg'
import StepOne from './StepOne.js';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour'

// Progress Bar Elements
let stepArray = [1,2,3,4]

// Current Step
let counter = 1;

function checkFormCompleted() {
    let nameInput = document.querySelector('.input-name')
    let sizeInput = document.querySelector('.collectionNumber')

    if (sizeInput) {
        if (sizeInput.value > 0 && nameInput.value.length > 0) {
            return true
        } else {
            return false
        }
    }
}

function updateCount () {
    counter = counter + 1;
}

function updateElement () {
    let elementArray = document.querySelectorAll('.progress-bar-element')
    for (let i = 0; i < counter; i++) {
        elementArray[i].classList.add('active-element')
        stepArray[i - 1] = <img src={tick} alt=""/>
    }
}

function hideContinueButton () {
    document.querySelector('.continue-button-container').style.display = 'none'
}

function ProgressBar () {

    const [step, setStep] = useState("1");

 return (
    <div>
        <div className="progress-bar-container">
         <div className="progress-bar-step">
            <div className="progress-bar-element active-element">{stepArray[0]}</div>
            <div className="progress-bar-text">Basic Info</div>
         </div>
         <div style={{width: '100%', height: "2px", background: "#ffffff", marginTop: "30px"}}></div>
         <div className="progress-bar-step">
            <div className="progress-bar-element">{stepArray[1]}</div>
            <div className="progress-bar-text">Digital Assets</div>
         </div>
         <div style={{width: '100%', height: "2px", background: "#ffffff", marginTop: "30px"}}></div>
         <div className="progress-bar-step" style={{marginBottom: '16px', marginRight: '-8px', marginLeft: '-8px'}}>
            <div className="progress-bar-element">{stepArray[2]}</div>
            <div className="progress-bar-text">Metadata</div>
         </div>
         <div style={{width: '100%', height: "2px", background: "#ffffff", marginTop: "30px", marginLeft: "6px"}}></div>
         <div className="progress-bar-step">
            <div className="progress-bar-element">{stepArray[3]}</div>
            <div className="progress-bar-text">Smart Contract</div>
         </div>
        </div>
        <div>
            {step === "1" && <StepOne/>}
            {step === "2" && <StepTwo randomisedMetaData = {false}/>}
            {step === "3" && <StepThree/>}
            {step === "4" && <StepFour/>}
            <div className='continue-button-container'>
                <button className="continue-button" onClick={() => { 
                    let formFilled = checkFormCompleted()
                    if (formFilled) {
                        updateCount(); 
                        updateElement(); 
                        setStep(`${counter}`)
                    } else if (formFilled === false){
                        alert('Fill out all fields')
                    } else if (counter > 1) {
                        updateCount(); 
                        updateElement(); 
                        setStep(`${counter}`)
                    }
                    }}>Continue</button>
            </div>
            {step === "4" && hideContinueButton()}
        </div>
    </div>
 );
}

export default ProgressBar 