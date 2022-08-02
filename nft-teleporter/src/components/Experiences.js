import TransparentHeader from "./TransparentHeader";
import '../styles/Experiences.css';
import vrBackground from '../vrBackground.svg'

function Experiences () {
    return (
            <div style={{backgroundImage: `url(${vrBackground})`, backgroundSize: '100% 100%', height: '100vh'}}>
            <div>
                <TransparentHeader/>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Experiences;