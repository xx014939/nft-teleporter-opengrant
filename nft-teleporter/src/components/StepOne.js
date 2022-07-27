import '../styles/StepOne.css';
import inputSVG from '../inputSVG.svg'

function StepOne () {
    return (
        <div className='step-one-container'>
            <h2>Basic Info</h2>
            <div className='step-one-input-container'>
                <div className='step-one-input-label'>Name (NFT Collection)</div>
                <div className='step-one-input-subcontainer'>
                    <div><img src={inputSVG}/></div>
                    <input type="text" placeholder='Name' label="Enter NFT Collection's Name"></input>
                </div>
            </div>
            <div className='step-one-input-container'>
                <div className='step-one-input-label'>Number of NFT's (inside of collection)</div>
                <div><input type="number" id="quantity" name="quantity" min="1" max="5"></input></div>
            </div>
            <div className='step-one-input-container'>
                <div>Do you want to Randomised Metada?</div>
                <div>YES</div>
                <div>NO</div>
            </div>
        </div>
    )
}

export default StepOne;