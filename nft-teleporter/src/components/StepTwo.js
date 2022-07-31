import '../styles/StepTwo.css'
import '../index.css'
import threedFile from '../3dFile.svg'

const selectBox = event => {
    event.currentTarget.classList.toggle('step-two-checkbox-icon-active');
  };

function StepTwo () {
    return (
        <div className='step-two-container'>
            <div className='step-one-heading-container'><h2>Digital Assets</h2></div>
            <div className='page-container'>
                <div className='step-two-checkbox-section'>
                    <div className='step-two-label'>What Assets you have available?</div>
                    <div className='step-two-checkbox-container'>
                        <div className='step-two-single-checkbox'>
                            <div className='step-two-checkbox-icon' onClick={selectBox}></div>
                            <div className='step-two-checkbox-label'>3D Digital Asset</div>
                        </div>
                        <div className='step-two-single-checkbox'>
                            <div className='step-two-checkbox-icon'onClick={selectBox}></div>
                            <div className='step-two-checkbox-label'>2D Digital Asset</div>
                        </div>
                        <div className='step-two-single-checkbox'>
                            <div className='step-two-checkbox-icon'onClick={selectBox}></div>
                            <div className='step-two-checkbox-label'>MP4 Video File</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='page-container'>
                <div className='step-two-upload-asset-section'>
                    <div className='step-two-label'>Upload your 3D Digital Asset</div>
                    <div className='step-two-upload-container'>
                        <div className='step-two-upload-svg'>
                            <img src={threedFile}/>
                        </div>
                        <div className='step-two-upload-main-text'>
                            <div>Drop Your 3D Files</div>
                            <div>Here</div>
                        </div>
                        <div className='step-two-upload-secondary-text'>
                            Max. file size is 25MB 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default StepTwo;