import TwoDBG from '../assets/twod-bg.svg'
import PlaceHolder from '../assets/placeholder.png'
import axios from 'axios';

function TwoDExperience () {
    async function retrieveImage() {

        let imageURL = await axios.post('http://localhost:5000/users/image', {username: "44"})
        console.log('IMAGE URL -->',imageURL)
    }

    retrieveImage()

    return (
        <div className='twod-experience-container' style={{backgroundImage: `url(${TwoDBG})`, backgroundSize: 'cover', height: '100vh', backgroundRepeat: 'no-repeat'}}>
            <img id='imageTag' src={PlaceHolder}/>
        </div>
    )
}

export default TwoDExperience;