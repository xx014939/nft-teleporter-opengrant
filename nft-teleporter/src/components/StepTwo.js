import '../styles/StepTwo.css'

function StepTwo () {
    return (
        <div className='step-one-container'>
            <div className='step-one-heading-container'><h2>Digital Assets</h2></div>
            <div className='step-two-checkbox-section'>
                <div className='step-two-label'>What Assets you have available?</div>
                <div className='step-two-checkbox-container'>
                    <div className='step-two-single-checkbox'>
                        <div className='step-two-checkbox-icon'>CHECKBOX</div>
                        <div className='step-two-checkbox-label'>LABEL</div>
                    </div>
                    <div className='step-two-single-checkbox'>
                        <div className='step-two-checkbox-icon'>CHECKBOX</div>
                        <div className='step-two-checkbox-label'>LABEL</div>
                    </div>
                    <div className='step-two-single-checkbox'>
                        <div className='step-two-checkbox-icon'>CHECKBOX</div>
                        <div className='step-two-checkbox-label'>LABEL</div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default StepTwo;