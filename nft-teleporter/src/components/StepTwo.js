import '../styles/StepTwo.css'
import '../index.css'
import React, { useState } from 'react';
import threedFile from '../3dFile.svg'
import mp4SVG from '../mp4SVG.svg'
import tick from '../tick.svg'
import imageSVG from '../imageSVG.svg'
import csvSVG from '../imageSVG.svg'
import {randomisedMetadata} from './StepOne'

let checkboxArray = [false, false, false]

const selectBox = event => {
    event.currentTarget.classList.toggle('step-two-checkbox-icon-active');
    checkboxArray[`${(event.currentTarget.id - 1)}`] = !checkboxArray[`${(event.currentTarget.id - 1)}`]

    // Show/Hide Upload Boxes
    const uploadBoxes = document.querySelectorAll('.upload-box')
    for (let i = 0; i < checkboxArray.length; i++) {
        if (checkboxArray[i] === true) {
            uploadBoxes[i].style.display = 'flex' 
        } else {
            uploadBoxes[i].style.display = 'none' 
        }
    }
  };

function UploadBox (props) {
    return (
        <div className='page-container upload-box' style={{display: 'none'}}>
            <div className='step-two-upload-asset-section'>
                <div className='step-two-label'>Upload your {props.fileType} Digital Asset</div>
                <div className='step-two-upload-container'>
                    <div className='step-two-upload-svg'>
                        <img src={props.svgName}/>
                    </div>
                    <div className='step-two-upload-main-text'>
                        <div>Drop your {props.fileType} files here or</div>
                        <div>Browse</div>
                    </div>
                    <div className='step-two-upload-secondary-text'>
                        Max. file size is 25MB 
                    </div>
                </div>
            </div>
        </div>
    )
}

function UploadMetadata () {
    while (randomisedMetadata === true) 
    { 
        return (
            <div className='page-container upload-box'>
            <div className='step-two-upload-asset-section'>
                <div className='step-two-label'>Upload your CSV Meta Data Asset</div>
                <div className='step-two-upload-container'>
                    <div className='step-two-upload-svg'>
                        <img src={csvSVG}/>
                    </div>
                    <div className='step-two-upload-main-text'>
                        <div>Drop your CSV file here or</div>
                        <div>Browse</div>
                    </div>
                    <div className='step-two-upload-secondary-text'>
                        Max. file size is 25MB 
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

console.log(randomisedMetadata)

function StepTwo () {

    return (
        <div className='step-two-container'>
            <div className='step-one-heading-container'><h2>Digital Assets</h2></div>
            <div className='page-container'>
                <div className='step-two-checkbox-section'>
                    <div className='step-two-label'>What Assets do you have currently available?</div>
                    <div className='step-two-checkbox-container'>
                        <div className='step-two-single-checkbox'>
                            <div className='step-two-checkbox-icon' id="1" onClick={selectBox}>
                                <img src={tick}/>
                            </div>
                            <div className='step-two-checkbox-label'>3D Digital Asset</div>
                        </div>
                        <div className='step-two-single-checkbox'>
                            <div className='step-two-checkbox-icon' id="2" onClick={selectBox}>
                                <img src={tick}/>
                            </div>
                            <div className='step-two-checkbox-label'>2D Digital Asset</div>
                        </div>
                        <div className='step-two-single-checkbox'>
                            <div className='step-two-checkbox-icon' id="3" onClick={selectBox}>
                                <img src={tick}/>
                            </div>
                            <div className='step-two-checkbox-label'>MP4 Video File</div>
                        </div>
                    </div>
                </div>
            </div>
            <UploadBox fileType="3D" svgName={threedFile}/>
            <UploadBox fileType="2D" svgName={imageSVG}/>
            <UploadBox fileType="MP4" svgName={mp4SVG}/>
            <UploadMetadata/>
        </div>
    ) 
}

export default StepTwo;