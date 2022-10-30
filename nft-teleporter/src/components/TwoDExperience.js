import TwoDBG from '../assets/twod-bg.svg'
import PlaceHolder from '../assets/placeholder.png'

function TwoDExperience () {
    return (
        <div className='twod-experience-container' style={{backgroundImage: `url(${TwoDBG})`, backgroundSize: 'cover', height: '100vh', backgroundRepeat: 'no-repeat'}}>
            <img id='imageTag' src={PlaceHolder}/>
        </div>
    )
}

export default TwoDExperience;