import TransparentHeader from "./TransparentHeader";
import '../styles/Experiences.css';
import bg from '../2049px.png'

function SelectExperienceModal () {
    return (
        <div className="select-modal-container">
            <div className="select-modal-header">

            </div>
            <div className="select-modal-body">
                <div className="select-modal-experience">
                    <div className="select-modal-experience-icon"></div>
                    <div className="select-modal-experience-text"></div>
                </div>
                <div className="select-modal-experience">
                    <div className="select-modal-experience-icon"></div>
                    <div className="select-modal-experience-text"></div>
                </div>
                <div className="select-modal-experience">
                    <div className="select-modal-experience-icon"></div>
                    <div className="select-modal-experience-text"></div>
                </div>
            </div>
        </div>
    )
}

function Experiences () {
    return (
            <div style={{backgroundImage: `url(${bg})`, backgroundSize: 'cover', height: '100vh', backgroundRepeat: 'no-repeat', opacity: '0.5'}}>
            <div>
                <TransparentHeader/>
            </div>
            <div>
                <SelectExperienceModal/>
            </div>
        </div>
    )
}

export default Experiences;