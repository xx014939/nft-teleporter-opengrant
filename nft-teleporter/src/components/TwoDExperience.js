import TwoDBG from '../assets/twod-bg.svg'
import PlaceHolder from '../assets/placeholder.png'
import axios from 'axios';
import React, { useState, useEffect  } from 'react';

function TwoDExperience () {
    async function retrieveImage() {

        let imageHash = await axios.post('http://localhost:5000/users/image', {username: "44"})
        console.log('IMAGE HASH -->', imageHash)
        return imageHash
    }

    let newSRC = retrieveImage()

    useEffect(() => {
        document.querySelector('.experience-image').src = `https://yourmetaworld.mypinata.cloud/${newSRC}`
    }, newSRC)

    return (
        <div className='twod-experience-container' style={{backgroundImage: `url(${TwoDBG})`, backgroundSize: 'cover', height: '100vh', backgroundRepeat: 'no-repeat'}}>
            <img className='experience-image' id='imageTag' src={PlaceHolder}/>
        </div>
    )
}

export default TwoDExperience;