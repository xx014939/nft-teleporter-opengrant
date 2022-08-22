import '../styles/StepTwo.css'
import '../styles/StepOne.css'
import '../index.css'
import tick from '../assets/tick.svg'

const selectBox = event => {
    event.currentTarget.classList.toggle('step-two-checkbox-icon-active');
  };

function StepThree () {
    return (
        <div className='step-two-container'>
            <div className='step-one-heading-container'><h2>Blockchains</h2></div>
            <div className='page-container'>
                <div className='step-two-checkbox-section'>
                    <div className='step-two-label'>Select blockchain for NFT collection</div>
                    <div className='step-two-checkbox-container'>
                        <div className='step-two-single-checkbox'>
                            <div className='step-two-checkbox-icon' onClick={selectBox}>
                                <img src={tick} alt=""/>
                            </div>
                            <div className='step-two-checkbox-label'>Ethereum</div>
                        </div>
                        <div className='step-two-single-checkbox'>
                            <div className='step-two-checkbox-icon' onClick={selectBox}>
                                <img src={tick} alt=""/>
                            </div>
                            <div className='step-two-checkbox-label'>Solana</div>
                        </div>
                        <div className='step-two-single-checkbox'>
                            <div className='step-two-checkbox-icon' onClick={selectBox}>
                                <img src={tick} alt=""/>
                            </div>
                            <div className='step-two-checkbox-label'>Hedera Hashgraph</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default StepThree;