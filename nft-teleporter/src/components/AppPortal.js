import logo from '../logo.svg';
import '../App.css';

function stepTwo() {
    console.log('clicked')
    document.querySelector('.lhs-inner').style.display = 'none'
    document.querySelector('.lhs-inner-two').style.display = 'flex'
}

function stepThree () {
    console.log('clicked')
    document.querySelector('.lhs-inner-two').style.display = 'none'
    document.querySelector('.lhs-inner-three').style.display = 'flex'

    // Checkbox Functionality 
    let checkboxArray = document.querySelectorAll('.checkbox-box')
    checkboxArray.forEach(checkbox => checkbox.addEventListener('click', () => {
        if (checkbox.classList.contains('checkbox-box-selected')) {
            checkbox.classList.remove('checkbox-box-selected')
        } else {
            checkbox.classList.add('checkbox-box-selected')
        }
    }) )
}

function stepFour () {
    console.log('step four')
}

function AppPortal() {
  return (
    <div>
        <div className='lhs-inner'>
            <div><img alt='NFT Teleporter Logo' src={logo}/></div>
            <div><a onClick={stepTwo} className='button' href='#'>Create Your Collection</a></div>
        </div>
        <div className='lhs-inner-two'>
            <div><img alt='NFT Teleporter Logo' src={logo}/></div>
            <div className='lhs-inner-two-text'>
                <div><h2>NFT Data</h2></div>
                <div><input className='input-field' placeholder='Collection Name' label="Collection Name"></input></div>
                <div><input className='input-field' placeholder='Token Symbol' label="Token Symbol"></input></div>
                <div><input className='input-field' placeholder='Number of NFTs inside Collection' type="number" id="quantity" name="quantity" min="1" max="5"></input></div>
                <div><a href='#' className='button' onClick={stepThree}>Continue</a></div>
            </div>
        </div>
        <div className='lhs-inner-three'>
            <div><img alt='NFT Teleporter Logo' src={logo}/></div>
            <div className='lhs-inner-two-text'>
                <div><h2>Digital Assets</h2></div>
                <div>Which assets would you like to include?</div>
                <div className='checkbox-container'>
                    <div className='checkbox'>
                        <div className='checkbox-box'></div>
                        <div className='checkbox-text'>3D Digital Asset</div>
                    </div>
                    <div className='checkbox'>
                        <div className='checkbox-box'></div>
                        <div className='checkbox-text'>2D Digital Asset</div>
                    </div>
                    <div className='checkbox'>
                        <div className='checkbox-box'></div>
                        <div className='checkbox-text'>MP4 Video File</div>
                    </div>
                </div>
                <div><a href='#' className='button' onClick={stepThree}>Continue</a></div>
            </div>
        </div>
    </div>
  );
}

export default AppPortal;