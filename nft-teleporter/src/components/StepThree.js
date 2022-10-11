import '../styles/StepThree.css'
import '../styles/StepTwo.css'
import '../styles/StepOne.css'
import '../index.css'
import tick from '../assets/tick.svg'
import Select from 'react-select';
import React, { useState, useEffect  } from 'react';
import axios from 'axios'; 
import parse from 'html-react-parser';

let counter = 1
let fileListUpdated = false
let currentlySelectedAsset = null

let attributeSelectedArray = [] // Multi-Dimensional Array - attributeSelectedArray[ASSET INDEX][CHECKBOX INDEX] - Checkbox index will hold a TRUE/FALSE value corresponding to CHECKED/UNCHECKED

const selectBox = event => { // This function is ONLY used for 1st checkbox. Subsequent boxes make use of the newAttribute() function
    if (attributeSelectedArray[currentlySelectedAsset]) {
                
        // Update its corresponding attribute true/false value inside the array
        let checkboxIndex = event.currentTarget.id

        if (attributeSelectedArray[currentlySelectedAsset][(parseInt(checkboxIndex))] === true) {
            attributeSelectedArray[currentlySelectedAsset][(parseInt(checkboxIndex))] = false
        } else {
            attributeSelectedArray[currentlySelectedAsset][(parseInt(checkboxIndex))] = true
        }

        event.currentTarget.classList.toggle('step-two-checkbox-icon-active');
        console.log(attributeSelectedArray)
    } else {
        alert('Please Select Asset First')
    }
  };

function getCookie(cookieName) {
    let cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${cookieName}=`))
    ?.split('=')[1];
    console.log(cookieValue)

    return cookieValue;
}

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

    function handleNameChange(event) {
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
            <input id='attributeName' className='attribute-name-input' onChange={handleNameChange} />
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

        let attributeCounter = document.querySelector('.attributes-created') // Attribute div container

        // Add new checkbox to asset connection section
        let newElement = document.querySelectorAll('.step-two-single-checkbox')[0].cloneNode(true)
        attributeCounter.append(newElement)
        let latestCheckBox = document.querySelectorAll('.step-two-checkbox-icon')

        // Add ID keeping track of box number
        latestCheckBox[(latestCheckBox.length -1)].id = `${(counter - 1)}`
        
        // Add onclick to new checkbox
        latestCheckBox[(latestCheckBox.length -1)].addEventListener('click', (event) => {
            // If there is an asset selected
            if (attributeSelectedArray[currentlySelectedAsset]) {
                
                // Update its corresponding attribute true/false value inside the array
                let checkboxIndex = event.currentTarget.id

                if (attributeSelectedArray[currentlySelectedAsset][(parseInt(checkboxIndex))] === true) {
                    attributeSelectedArray[currentlySelectedAsset][(parseInt(checkboxIndex))] = false
                } else {
                    attributeSelectedArray[currentlySelectedAsset][(parseInt(checkboxIndex))] = true
                }

                event.currentTarget.classList.toggle('step-two-checkbox-icon-active');
                console.log(attributeSelectedArray)
            } else {
                alert('Please Select Asset First')
            }
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

                for (let i = 0; i < attributeSelectedArray.length; i++) {
                    attributeSelectedArray[i].push(false)
                }
                console.log(attributeSelectedArray)
            }}>Add More</div>
        </div>
    )
}

function AssetsConnectionList() {
    const [fileList, setFileList] = useState([]);

    async function retrieveFileList() {
        let userID = getCookie('userID')
        let patchUrl = `http://localhost:5000/users/${userID}` // Our backend server
        let jwtToken = getCookie('jwt')
        const config = {
            maxContentLength: "Infinity",
            headers: { 
                'Authorization': `Bearer ${jwtToken}` 
            }
        }

        let userResponse = await axios.get(patchUrl, config)
        let existingFileList = userResponse.data.collection_assets
        let currentCollectionFileList = existingFileList[(existingFileList.length - 1)]
        console.log('working')
        console.log(currentCollectionFileList)
        if (fileListUpdated === false) {
            if (currentCollectionFileList[0].length > 1) {
                for (let i = 1; i < currentCollectionFileList[0].length; i++) {
                    setFileList(fileList.concat(`${currentCollectionFileList[0][i][0]}`))
                }
            }
    
            if (currentCollectionFileList[1].length > 1) {
                for (let i = 1; i < currentCollectionFileList[1].length; i++) {
                    setFileList(fileList.concat(`<div>${currentCollectionFileList[1][i][0]}</div>`))
                }
            }
    
            if (currentCollectionFileList[2].length > 1) {
                for (let i = 1; i < currentCollectionFileList[2].length; i++) {
                    setFileList(fileList.concat(`${currentCollectionFileList[2][i][0]}`))
                }   
            }
    
            fileListUpdated = true
        }
    }

    useEffect(() => {
        retrieveFileList()
        let fileListElement = document.querySelector('.file-name')

        for (let i = 0; i < fileList.length; i++) {
            let newFile = document.createElement('div')
            newFile.classList.add('new-file-name')
            newFile.innerHTML = `${fileList[i]}`
            newFile.addEventListener('click', () => {
                newFile.classList.toggle('new-file-name--active')
                currentlySelectedAsset = i
                console.log(currentlySelectedAsset)
            })

            fileListElement.append(newFile)
            attributeSelectedArray.push([false])
        }

        console.log('THE FILE LIST IS -->', fileList)
      }, [fileList]);

    return(
        <div>
            <div className='assets-plus-attributes-header'>
                <div>Assets Uploaded</div>
                <div>Attributes Created</div>
            </div>
            <div className='assets-plus-attributes-container'>
                <div className='file-name'>

                </div>
                <div className='attributes-list attributes-created'>
                    <div className='step-two-single-checkbox'>
                        <div className='step-two-checkbox-icon' id='0' onClick={selectBox}>
                            <img src={tick} alt=""/>
                        </div>
                        <div className='step-two-checkbox-label'>
                            <span className='attribute-element-name'>NAME</span> - <span className='attribute-element-value'>VALUE</span>
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