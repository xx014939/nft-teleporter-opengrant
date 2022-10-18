import '../styles/StepOne.css';
import inputSVG from '../assets/inputSVG.svg'

const selectButton = event => {
    event.currentTarget.classList.toggle('step-one-single-button-container-active');
    event.currentTarget.classList.toggle('step-one-single-button-container');
  };

function setCookie(cookieName, boolean) {
    document.cookie = cookieName + "=" + boolean;
    // console.log(document.cookie)
}

function StepOne () {
    

return (
    <div className='step-one-container'>
        <div className='step-one-heading-container'><h2>Basic Info</h2></div>
        <div className='step-one-input-container'>
            <div className='step-one-input-label'>Collection Name</div>
            <div className='step-one-input-subcontainer'>
                <div><img src={inputSVG} alt=""/></div>
                <input className="input-name" type="text" placeholder='Name' label="Enter NFT Collection's Name"></input>
            </div>
        </div>
        <div className='step-one-input-container' style={{marginTop: '30px'}}>
            <div className='step-one-input-label'>Collection Description</div>
            <div className='step-one-input-subcontainer'>
                <div><img src={inputSVG} alt=""/></div>
                <input className="input-description" type="text" placeholder='Description' label="Enter NFT Collection's Name"></input>
            </div>
        </div>
        <div className='step-one-input-container'>
            <div className='step-one-input-label' style={{marginTop: '38px'}}>Number of NFT's (inside of collection)</div>
            <div className='quantity-selector-container'>
                <div className='quantity-selector'>
                    <div className="quantity-selector-btn" onClick={() => { 
                        if (document.getElementById("collectionNumber").value > 0) {
                            document.getElementById("collectionNumber").value--
                        }
                    }}>-</div>
                    <input className='collectionNumber' id="collectionNumber" type="number" name="quantity" min="0" max="10000" placeholder="0"></input>
                    <div className="quantity-selector-btn" onClick={() => { document.getElementById("collectionNumber").value++}}>+</div>
                </div>
            </div>
        </div>
        <div className='step-one-input-container'>
            <div className='step-one-input-label' style={{marginBottom: '14px'}}>Do you want to Randomised Metada?</div>
            <div className='step-one-buttons-container'>
                <div className='step-one-single-button-container' onClick={selectButton} style={{marginRight: '15px'}}>
                    <div className='step-one-single-button' onClick={() => {
                        // Set Cookie Data onClick
                        setCookie("randomdata", true) // Metadata 
                        setCookie("currentCollectionName", document.querySelector('.input-name').value) // Collection Name
                        setCookie("currentCollectionDescription", document.querySelector('.input-description').value) // Collection Description
                        setCookie("currentCollectionCount", document.querySelector(".collectionNumber").value.toString()) // Collectio Count (numbe of NFT's in collection)
                        console.log('The number is here --> ', document.querySelector(".collectionNumber").value.toString())
                        }}>
                        <div className='step-one-single-button-icon'>
                            <div className='step-one-single-button-icon-inner'></div>
                        </div>
                        <div>Yes</div>
                    </div>
                </div>
                <div className='step-one-single-button-container' onClick={selectButton}>
                    <div className='step-one-single-button' onClick={() => {
                         setCookie("randomdata", false) // Metadata 
                         setCookie("currentCollectionName", document.querySelector('.input-name').value) // Collection Name
                         setCookie("currentCollectionDescription", document.querySelector('.input-description').value) // Collection Description
                         setCookie("currentCollectionCount", document.querySelector(".collectionNumber").value.toString()) // Collectio Count (numbe of NFT's in collection)
                         console.log('The number is here --> ', document.querySelector(".collectionNumber").value.toString())
                        }}>
                        <div className='step-one-single-button-icon'>
                            <div className='step-one-single-button-icon-inner'></div>
                        </div>
                        <div>No</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}


export default StepOne;