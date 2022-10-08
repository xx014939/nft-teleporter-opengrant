import '../styles/StepThree.css'
import '../styles/StepTwo.css'
import '../styles/StepOne.css'
import '../index.css'
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
        let allCreated = document.querySelectorAll('.attribute-element')
        for (let i = 0; i < allInputs.length; i++) {
            if (allInputs[i] === event.target) { // Locate input box index in node list
                allCreated[i].innerHTML = event.target.value // Update corresponding div inside div nodelist
            }
        }

      }

    return (
        <div className="metadata-attributes-input-container">
            <input id='attributeName' className='attribute-name-input' onChange={handleChange} />
            <input id='attributeValue'/>
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

        let attributeCounter = document.querySelector('.attributes-created') // Attribute div container

        let newAttributeElement = document.createElement("div")
        newAttributeElement.classList.add('attribute-element')
        newAttributeElement.innerHTML = counter
        attributeCounter.append(newAttributeElement) // Add new child div, representing the new attribute
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
            <div>Assets Upload - Attributes Created</div>
            <div className='attributes-created'>
                <div className='attribute-element'></div>
            </div>
        </div>
    )
}

function StepThree () {

    return (
        <div className='step-two-container'>
            <div className='step-one-heading-container'><h2>Metadata</h2></div>
            <div className='page-container' style={{flexDirection: 'column'}}>
                <div className='step-two-label'>What attributes will your collections have?</div>
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