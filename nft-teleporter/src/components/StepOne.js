import '../styles/StepOne.css';
import inputSVG from '../inputSVG.svg'
import {useState} from 'react';

let randomMetaData = false

const selectButton = event => {
    event.currentTarget.classList.toggle('step-one-single-button-container-active');
    event.currentTarget.classList.toggle('step-one-single-button-container');
  };

function StepOne () {
    return (
        <div className='step-one-container'>
            <div className='step-one-heading-container'><h2>Basic Info</h2></div>
            <div className='step-one-input-container'>
                <div className='step-one-input-label'>Name (NFT Collection)</div>
                <div className='step-one-input-subcontainer'>
                    <div><img src={inputSVG}/></div>
                    <input type="text" placeholder='Name' label="Enter NFT Collection's Name"></input>
                </div>
            </div>
            <div className='step-one-input-container'>
                <div className='step-one-input-label' style={{marginTop: '38px'}}>Number of NFT's (inside of collection)</div>
                <div className='quantity-selector-container'>
                    <input type="number" id="quantity" name="quantity" min="1" max="5"></input>
                    <div className='quantity-selector'>
                        <div>-</div>
                        <div>1</div>
                        <div>+</div>
                    </div>
                </div>
            </div>
            <div className='step-one-input-container'>
                <div className='step-one-input-label' style={{marginBottom: '14px'}}>Do you want to Randomised Metada?</div>
                <div className='step-one-buttons-container'>
                    <div className='step-one-single-button-container' onClick={selectButton} style={{marginRight: '15px'}}>
                        <div className='step-one-single-button'>
                            <div className='step-one-single-button-icon'>
                                <div className='step-one-single-button-icon-inner'></div>
                            </div>
                            <div onClick={() => {randomMetaData = true}}>Yes</div>
                        </div>
                    </div>
                    <div className='step-one-single-button-container' onClick={selectButton}>
                        <div className='step-one-single-button'>
                            <div className='step-one-single-button-icon'>
                                <div className='step-one-single-button-icon-inner'></div>
                            </div>
                            <div onClick={() => {randomMetaData = false}}>No</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export let randomisedMetadata = randomMetaData;
export default StepOne;