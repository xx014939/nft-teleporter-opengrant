import TwoDBG from '../assets/twod-bg.svg'
import PlaceHolder from '../assets/placeholder.png'
import axios from 'axios';

function TwoDExperience () {
    async function retrieveImage() {
        let imageURL = await axios.get('http://localhost:5000/users/image')
        console.log('IMAGE URL -->',imageURL)
    }

    retrieveImage()
    console.log('hereeee')

    return (
        <div className='twod-experience-container' style={{backgroundImage: `url(${TwoDBG})`, backgroundSize: 'cover', height: '100vh', backgroundRepeat: 'no-repeat'}}>
            <img id='imageTag' src={PlaceHolder}/>
        </div>
    )
}

export default TwoDExperience;