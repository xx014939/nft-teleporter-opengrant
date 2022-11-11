import TwoDBG from '../assets/twod-bg.svg'
import PlaceHolder from '../assets/placeholder.png'
import axios from 'axios';
import React, { useEffect  } from 'react';

function getCookie(cookieName) {
    let cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${cookieName}=`))
    ?.split('=')[1];
    console.log(cookieValue)
  
    return cookieValue;
  }
  

function TwoDExperience () {
    async function retrieveImage() {
        let imageHash = await axios.post('https://shrouded-citadel-26581.herokuapp.com/users/image', {username: `${getCookie('currentUsername')}`}) // TODO - Pass in users actual username
        return imageHash
    }

    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
          const data = await retrieveImage();
          console.log('DATA -->', data.data.imageHash)
          document.querySelector('.experience-image').src = `https://yourmetaworld.mypinata.cloud/ipfs/${data.data.imageHash}`
          return data;
        }
      
        // call the function
        const result = fetchData().catch(console.error);
      
      }, [])

    return (
        <div className='twod-experience-container' style={{backgroundImage: `url(${TwoDBG})`, backgroundSize: 'cover', height: '100vh', backgroundRepeat: 'no-repeat'}}>
            <img className='experience-image' id='imageTag' src={PlaceHolder}/>
        </div>
    )
}

export default TwoDExperience;