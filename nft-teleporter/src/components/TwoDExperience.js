import TwoDBG from '../assets/twod-bg.svg'
import PlaceHolder from '../assets/placeholder.png'
import axios from 'axios';

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

        let jwtToken = getCookie('jwt')
        const config = {
            headers: { 
                'Authorization': `Bearer ${jwtToken}` 
            }
        }

        console.log('THE JWT TOKEN IS -->', jwtToken)

        let imageURL = await axios.get('http://localhost:5000/users/image', {'username': '44'}, config)
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