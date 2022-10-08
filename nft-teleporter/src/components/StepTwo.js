import '../styles/StepTwo.css'
import '../index.css'
import threedFile from '../assets/3dFile.svg'
import mp4SVG from '../assets/mp4SVG.svg'
import tick from '../assets/tick.svg'
import imageSVG from '../assets/imageSVG.svg'
import csvSVG from '../assets/imageSVG.svg'
import { useState } from 'react';
import FormData from 'form-data';
import axios from 'axios'; 
require('dotenv').config()

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

function getCookie() {
    let cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('randomdata='))
    ?.split('=')[1];
    console.log(cookieValue)

    return cookieValue;
}

function UploadBox (props) {
    return (
        <div className='page-container upload-box' style={{display: 'none'}}>
            <div className='step-two-upload-asset-section'>
                <div className='step-two-label'>Upload your {props.fileType} Digital Asset</div>
                <div className='step-two-upload-container'>
                    <div className='step-two-upload-svg'>
                        <img src={props.svgName} alt="" />
                    </div>
                    <div className='step-two-upload-main-text'>
                        <div>Drop your {props.fileType} files here or</div>
                        <div onClick={()=>{
                            document.querySelector('.file-input').click()
                        }}>Browse</div>
                    </div>
                    <div className='step-two-upload-secondary-text'>
                        Max. file size is 25MB 
                    </div>
                </div>
            </div>
        </div>
    )
}

function UploadMetadata (props) {
    if (props.showMetaUpload === true) 
    { 
        return (
            <div className='page-container upload-box'>
            <div className='step-two-upload-asset-section'>
                <div className='step-two-label'>Upload your CSV Meta Data Asset</div>
                <div className='step-two-label'>Click here to find out how to format your CSV file</div>
                <div className='step-two-upload-container'>
                    <div className='step-two-upload-svg'>
                        <img src={csvSVG} alt=""/>
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

function StepTwo () {

    const [file, setFile] = useState()
    const [myipfsHash, setIPFSHASH] = useState('')
  
    const handleFile = async (fileToHandle) =>{
  
      
  
        console.log('starting')
    
        // initialize the form data
        const formData = new FormData()
    
        // append the file form data to 
        formData.append("file", fileToHandle)
        for (const value of formData.values()) {
            console.log(value, 'here')
        }
    
        // call the keys from .env
    
        const API_KEY = process.env.REACT_APP_API_KEY
        const API_SECRET = process.env.REACT_APP_API_SECRET

        console.log('KEYS -->', API_KEY, API_SECRET)
    
        // the endpoint needed to upload the file
        const url =  `https://api.pinata.cloud/pinning/pinFileToIPFS`
    
        const response = await axios.post(
            url,
            formData,
            {
                maxContentLength: "Infinity",
                headers: {
                    "Content-Type": `multipart/form-data;boundary=${formData._boundary}`, 
                    'pinata_api_key': `${API_KEY}`,
                    'pinata_secret_api_key': `${API_SECRET}`
                }
            }
        )

        console.log(response.data.IpfsHash)
    }

    return (
        <div className='step-two-container'>
            <div className='step-one-heading-container'><h2>Digital Assets</h2></div>
            <div className='page-container'>
                <div className='step-two-checkbox-section'>
                    <div className='step-two-label'>What Assets do you have currently available?</div>
                    <div className='step-two-checkbox-container'>
                        <div className='step-two-single-checkbox'>
                            <div className='step-two-checkbox-icon' id="1" onClick={selectBox}>
                                <img src={tick} alt=""/>
                            </div>
                            <div className='step-two-checkbox-label'>3D Digital Asset</div>
                        </div>
                        <div className='step-two-single-checkbox'>
                            <div className='step-two-checkbox-icon' id="2" onClick={selectBox}>
                                <img src={tick} alt=""/>
                            </div>
                            <div className='step-two-checkbox-label'>2D Digital Asset</div>
                        </div>
                        <div className='step-two-single-checkbox'>
                            <div className='step-two-checkbox-icon' id="3" onClick={selectBox}>
                                <img src={tick} alt=""/>
                            </div>
                            <div className='step-two-checkbox-label'>MP4 Video File</div>
                        </div>
                    </div>
                </div>
            </div>
            <UploadBox fileType="3D" svgName={threedFile}/>
            <UploadBox fileType="2D" svgName={imageSVG}/>
            <UploadBox fileType="MP4" svgName={mp4SVG}/>
            {getCookie() === 'true' && <UploadMetadata showMetaUpload = {true}/>}

            <div className="file-manager-upload-form">
                <label class="custom-file-upload">
                    <input className='file-input' type="file" onChange={(event)=>setFile(event.target.files[0])}/>
                    Upload
                </label>
                <button className='pin-button' onClick={()=>handleFile(file)}>Pin</button>
                <a href='#signContract' className='pin-button' style={{maxWidth: '200px'}}>Sign?</a>
            </div>
        </div>
    ) 
}

export default StepTwo;