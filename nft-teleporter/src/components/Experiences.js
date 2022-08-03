import TransparentHeader from "./TransparentHeader";
import '../styles/Experiences.css';
import vrBackground from '../vrBackground.svg'

function Experiences () {
    return (
            <div style={{backgroundImage: `url(${vrBackground})`, backgroundSize: 'cover', height: '100vh', backgroundRepeat: 'no-repeat', opacity: '0.5'}}>
            <div>
                <TransparentHeader/>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Experiences;