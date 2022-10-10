import '../styles/StepThree.css'
import '../styles/StepTwo.css'
import '../styles/StepOne.css'
import '../index.css'
import tick from '../assets/tick.svg'
import Select from 'react-select';
import React, { useState } from 'react';

let counter = 1

const selectBox = event => {
    event.currentTarget.classList.toggle('step-two-checkbox-icon-active');
  };

function getCookie(cookieName) {
    let cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${cookieName}=`))
    ?.split('=')[1];
    console.log(cookieValue)

    return cookieValue;
}

// Upon adding a new attribute
// Let the next section know there is a new attribute, hence creating a checkbox for it
// Append the attribute name to the checkbox

// IN OTHER WORDS
// Upon creating a new attribute
// Output 1. a new attribute signal 2. attribute name and value (dynamic use onchange)

function AttributeInput () {
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { value: 'Common', label: 'Common' },
        { value: 'Uncommon', label: 'Uncommon' },
        { value: 'Rare', label: 'Rare' },
        { value: 'Very Rare', label: 'Very Rare' },
        { value: 'Ultra Rare', label: 'Ultra Rare' },
        { value: 'Legendary', label: 'Legendary' },
    ];

    function handleChange(event) {
        console.log(event.target.value);
        let allInputs = document.querySelectorAll('.attribute-name-input')
        let allCreated = document.querySelectorAll('.attribute-element-name')
        for (let i = 0; i < allInputs.length; i++) {
            if (allInputs[i] === event.target) { // Locate input box index in node list
                allCreated[i].innerHTML = event.target.value // Update corresponding div inside div nodelist
            }
        }

      }
    
    function handleValueChange(event) {
        let allInputs = document.querySelectorAll('.attribute-value-input')
        let allCreated = document.querySelectorAll('.attribute-element-value')
        for (let i = 0; i < allInputs.length; i++) {
            if (allInputs[i] === event.target) { // Locate input box index in node list
                allCreated[i].innerHTML = event.target.value // Update corresponding div inside div nodelist
            }
        }
    }

    return (
        <div className="metadata-attributes-input-container">
            <input id='attributeName' className='attribute-name-input' onChange={handleChange} />
            <input id='attributeValue' className='attribute-value-input' onChange={handleValueChange}/>
            <div>
                <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                />
            </div>
        </div>
    )
}

function AttributeInputList () {
    document.cookie = "numberOfAttributes=" + counter
    const [inputList, setInputList] = useState([]);   

    function newAttribute() {
        setInputList(inputList.concat(<AttributeInput key={inputList.length}/>)); // Create new attribute element

        // Add new checkbox to asset connection section
        let newElement = document.querySelectorAll('.step-two-single-checkbox')[0].cloneNode(true)
        attributeCounter.append(newElement)
        let latestCheckBox = document.querySelectorAll('.step-two-checkbox-icon')
        
        // Add onclick to new checkbox
        latestCheckBox[(latestCheckBox.length -1)].addEventListener('click', (event) => {
            event.currentTarget.classList.toggle('step-two-checkbox-icon-active');
        })
    }

    return (
        <div className="metadata-attributes-body">
            <AttributeInput/>
            {inputList}
            <div className='add-more-btn' onClick={() => {
                counter = counter + 1; 
                document.cookie = "numberOfAttributes=" + counter
                newAttribute(); 
            }}>Add More</div>
        </div>
    )
}

function AssetsConnectionList() {
    return(
        <div>
            <div className='assets-plus-attributes-header'>
                <div>Assets Uploaded</div>
                <div>Attributes Created</div>
            </div>
            <div className='assets-plus-attributes-container'>
                <div className='file-name'>
                    FILENAME.PNG
                </div>
                <div className='attributes-list attributes-created'>
                    <div className='step-two-single-checkbox'>
                        <div className='step-two-checkbox-icon' onClick={selectBox}>
                            <img src={tick} alt=""/>
                        </div>
                        <div className='step-two-checkbox-label'>
                            <span className='attribute-element-name'></span> - <span className='attribute-element-value'>VALUE</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StepThree () {

    return (
        <div className='step-two-container'>
            <div className='step-one-heading-container'><h2>Metadata</h2></div>
            <div className='page-container' style={{flexDirection: 'column'}}>
                <div className='step-two-label'>What attributes will your collections have? (Multiple attributes with the same name are permitted)</div>
                <div className="metadata-attributes-modal">
                    <div className="metadata-attributes-header">
                        <div>Attribute Name</div>
                        <div>Attribute Value</div>
                        <div>Attribute Rarity</div>
                    </div>
                </div>
                    <AttributeInputList/>
                <div className='step-two-label'>Connect uploaded assets to your attributes</div>
                    <AssetsConnectionList/>
                {/* <div className='step-two-checkbox-section'>
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
                </div> */}
            </div>
        </div>
    ) 
}

export default StepThree;