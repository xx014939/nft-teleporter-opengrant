import '../styles/StepThree.css'
import '../styles/StepTwo.css'
import '../styles/StepOne.css'
import '../index.css'
import tick from '../assets/tick.svg'
import Select from 'react-select';
import React, { useState, useEffect  } from 'react';
import axios from 'axios'; 
import parse from 'html-react-parser';

let selectedAttributeIndexes = [] // After user selects the image attribute, the indexes of attribute are saved here
let currentlySelectedAttributeIndex = null
let rarities = []

let counter = 1
let fileListUpdated = false
let fileListHashes = []
let currentlySelectedAsset = null

// uniqueNames array used to save unique attributes (not their values)
let attributeNames = []
let uniqueNames = []

let assetButtonList = []

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
        let allInputs = document.querySelectorAll('.attribute-name-input')
        let allCreated = document.querySelectorAll('.attribute-element-name')
        for (let i = 0; i < allInputs.length; i++) {
            if (allInputs[i] === event.target) { // Locate input box index in node list
                allCreated[i].innerHTML = event.target.value // Update corresponding div inside div nodelist
                attributeNames[i] = event.target.value
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
                onChange={(choice) => rarities[(counter - 1)] = (choice)}
                />
            </div>
        </div>
    )
}

function AttributeInputList () {
    document.cookie = "numberOfAttributes=" + counter
    const [inputList, setInputList] = useState([]);   

    function newAttribute() {
        setInputList(inputList.concat(<AttributeInput key={inputList.length} />)); // Create new attribute element

        let attributeCounter = document.querySelector('.attributes-created') // Attribute div container

        // Add new checkbox to asset connection section
        let newElement = document.querySelectorAll('.step-two-single-checkbox')[0].cloneNode(true)
        attributeCounter.append(newElement)
        let latestCheckBox = document.querySelectorAll('.step-two-checkbox-icon')

        // Add ID keeping track of box number
        latestCheckBox[(latestCheckBox.length -1)].id = `${(counter - 1)}`

        // Remove checked class if present (default is unchecked)
        latestCheckBox[(latestCheckBox.length -1)].classList.remove('step-two-checkbox-icon-active')

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
        let patchUrl = `https://shrouded-citadel-26581.herokuapp.com/users/${userID}` // Our backend server
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

            // 3D
            if (currentCollectionFileList[0].length > 1) {
                for (let i = 1; i < currentCollectionFileList[0].length; i++) {
                    setFileList(current => [...current, `<div>${currentCollectionFileList[0][i][0]}</div>`])
                    fileListHashes.push(currentCollectionFileList[0][i][1])
                }
            }
    
            // 2D
            if (currentCollectionFileList[1].length > 1) {
                for (let i = 1; i < currentCollectionFileList[1].length; i++) {
                    setFileList(current => [...current, `<div>${currentCollectionFileList[1][i][0]}</div>`]);
                    fileListHashes.push(currentCollectionFileList[1][i][1])
                }
            }
    
            // MP4
            if (currentCollectionFileList[2].length > 1) {
                for (let i = 1; i < currentCollectionFileList[2].length; i++) {
                    setFileList(current => [...current, `<div>${currentCollectionFileList[2][i][0]}</div>`])
                    fileListHashes.push(currentCollectionFileList[2][i][1])
                }   
            }
    
            fileListUpdated = true
        }
    }

    useEffect(() => {
        retrieveFileList()
        let fileListElement = document.querySelector('.file-name')
        let doFileElementsExist = document.querySelectorAll('.new-file-name')
        console.log(doFileElementsExist, 'HERE')

        if (!doFileElementsExist.length > 0) {
            for (let i = 0; i < fileList.length; i++) {
                let newFile = document.createElement('div')
                newFile.classList.add('new-file-name')
                newFile.innerHTML = `${fileList[i]}`
                assetButtonList.push(newFile)
                newFile.addEventListener('click', () => {
                    newFile.classList.toggle('new-file-name--active')
                    currentlySelectedAsset = i
                    console.log(currentlySelectedAsset)

                    // Unselect other assets if they are selected
                    for (let i = 0; i < assetButtonList.length; i++) {
                        if (assetButtonList[i] !== newFile) {
                            assetButtonList[i].classList.remove('new-file-name--active')
                        }
                    }

                    // Check/Uncheck attribute boxes based on current value in attributeSelectedArray 
                    let currentCheckBoxes = document.querySelectorAll('.step-two-checkbox-icon')
                    for (let i = 0; i < currentCheckBoxes.length; i++) {
                        let currentBool = attributeSelectedArray[currentlySelectedAsset][i]
                        if (currentBool) {
                            if (!currentCheckBoxes[i].classList.contains('step-two-checkbox-icon-active')) {
                                currentCheckBoxes[i].classList.add('step-two-checkbox-icon-active')
                            }
                        } else {
                            console.log(currentCheckBoxes[i], 'Checkbox that is false')
                            currentCheckBoxes[i].classList.remove('step-two-checkbox-icon-active')
                        }
                    }
                })
    
                fileListElement.append(newFile)
                attributeSelectedArray.push([false])
            }
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
            <MetadataImage/>
        </div>
    )
}

const selectButton = event => {
    event.currentTarget.classList.toggle('step-one-single-button-container-active');
    event.currentTarget.classList.toggle('step-one-single-button-container');
  };
async function generateMetadata() {

    let relevantIndexes = []
    let attributeValues = document.querySelectorAll('.attribute-value-input')
    let finalAttributesArray = []

    let collectionSize = getCookie('collectionSize')
    let metadataArray = []

    for (let i = 0; i < collectionSize; i++) {
        for (let j = 0; j < uniqueNames.length; j++) {
        
            let tempAttributeValueArray = []
            let currentRarity = null
            let diceRoll = Math.floor(Math.random() * 1001) // Random number between 0 - 1000
        
            // For every thousand
            // Common - 499, Uncommon - 400, Rare - 50, Very Rare - 35, Ultra Rare - 15, Legendary - 1
            if (diceRoll < 500) {
                currentRarity = 'Common'
            } else if (diceRoll > 499 && diceRoll < 900) {
                currentRarity = 'Uncommon'
            } else if (diceRoll > 899 && diceRoll < 950) {
                currentRarity = 'Rare'
            } else if (diceRoll > 949 && diceRoll < 985) {
                currentRarity = 'Very rare'
            } else if (diceRoll > 984 && diceRoll < 1000) {
                currentRarity = 'Ultra rare'
            } else {
                currentRarity = 'Legendary'
            }
    
            console.log('CURRENT ITERATION + RARITY = ', j, currentRarity)
    
            for (let k = 0; k < rarities.length; k++) {
                if (rarities[k].value === currentRarity && uniqueNames[j].toString() === attributeNames[k].toString()) {
                    relevantIndexes.push(k)
                    tempAttributeValueArray.push([attributeNames[k], attributeValues[k].value]) // Save all attributes which the proper name and rarity
                }
                
            }

            // If rarity doesn't match any existing attribute, then re-roll
            if (tempAttributeValueArray.length === 0) {
                
                currentRarity = 'Common'
        
                for (let k = 0; k < rarities.length; k++) {
                    if (rarities[k].value === currentRarity && uniqueNames[j].toString() === attributeNames[k].toString()) {
                        relevantIndexes.push(k)
                        tempAttributeValueArray.push([attributeNames[k], attributeValues[k].value]) // Save all attributes which the proper name and rarity
                    }
                    
                }

            }
    
            // Randomly pick one attribute with equal probability
            if (tempAttributeValueArray.length > 0) {
                let randomIndex = Math.floor(Math.random() * ((tempAttributeValueArray.length - 1) - 0 + 1) + 0)
                console.log('THE RANDOM INDEX IS -->', randomIndex)
                finalAttributesArray.push(tempAttributeValueArray[randomIndex])
            }
    
    
        
            console.log('The current rarity is -->', currentRarity)
            console.log('The relevant rarity indexes are -->', relevantIndexes)
            console.log('The temp attribute array is -->', tempAttributeValueArray)
            console.log('The final attribute array is -->', finalAttributesArray)
            console.log(uniqueNames)
    
        }

        let arrayToObject = ''
        for (let i = 0; i < finalAttributesArray.length; i++) {
            if (i > 0) { // Add comma at the front if there is an element before it
                arrayToObject = arrayToObject + `,{"trait_type": "${finalAttributesArray[i][0]}", "value": "${finalAttributesArray[i][1]}"}`    
            } else {
                arrayToObject = arrayToObject + `{"trait_type": "${finalAttributesArray[i][0]}", "value": "${finalAttributesArray[i][1]}"}`
            }
        }

        let imageHash = ''

        // attributeSelectedArray has multi dimensions [ASSET INDEX][ATTRIBUTE INDEX]
        // For every asset
        for (let k = 0; k < attributeSelectedArray.length; k++) {
            for (let n = 0; n < selectedAttributeIndexes.length; n++) { // For every attribute index with the selected name
                if (attributeSelectedArray[k][selectedAttributeIndexes[n]] === true) { // If true then checkbox is selected for this asset
                    
                    // Compare the checbox with the selectedAttributeIndexes[n] index to the current metadata value
                    let allCheckboxNames = document.querySelectorAll('.attribute-element-name')
                    let allCheckboxValues = document.querySelectorAll('.attribute-element-value')
                    
                    for (let s = 0; s < finalAttributesArray.length; s++) {
                        if (finalAttributesArray[s][0] === allCheckboxNames[selectedAttributeIndexes[n]].innerHTML && finalAttributesArray[s][1] === allCheckboxValues[selectedAttributeIndexes[n]].innerHTML) {
                            imageHash = fileListHashes[selectedAttributeIndexes[n]]
                            console.log('The file hash is -->', imageHash)
                        }
                    }
                }
            }
        }


        let collectionDescription = getCookie('currentCollectionDescription')
        let collectionName = getCookie('currentCollectionName')
        let nftName = `${collectionName} - #${i}`
        let collectionURL = "https://nftteleporter.com/"

        let metaData = `{"description": "${collectionDescription}", "external_url": "${collectionURL}", "image": "https://yourmetaworld.mypinata.cloud/ipfs/${imageHash}", "name": "${nftName}","attributes": [${arrayToObject}]}`

        metadataArray.push(metaData)
        console.log('THE METADATA FOR THIS NFT IS -->', metadataArray) 
        finalAttributesArray = []
    }

    // Host metadata on IPFS 
    let baseURI = await axios.post('https://shrouded-citadel-26581.herokuapp.com/users/metadata-creation', {metadata: metadataArray})
    let responseObject = JSON.parse(baseURI.data.response)
    document.cookie = 'collectionURIHash=' + responseObject.IpfsHash

}

function showAttributes () {

    // Add unique attribute names to array
    attributeNames.forEach((attribute) => {
        if (!uniqueNames.includes(attribute)) {
            uniqueNames.push(attribute)
            console.log(uniqueNames)
        }
    })

    // Show attribute container and reset the inner HTML
    document.querySelector('.unique-name-container').style.display = "flex"
    document.querySelector('.unique-name-container').innerHTML = ""

    uniqueNames.forEach((uniqueName) => {
        // Create new div element for unique attribute
        let nameDiv = document.createElement('div')
        nameDiv.innerHTML = `${uniqueName}`
        nameDiv.classList.add('unique-name')
        // Add event listenter to div, so we can add/remove active class
        nameDiv.addEventListener('click', () => {
            nameDiv.classList.toggle('unique-name--active')
            for (let i = 0; i < document.querySelectorAll('.unique-name').length; i++) {
                if (nameDiv !== document.querySelectorAll('.unique-name')[i]) {
                    document.querySelectorAll('.unique-name')[i].classList.remove('unique-name--active')
                }
            }

            document.cookie = 'imageAttributeName=' + nameDiv.innerHTML // Save selected attribute to cookies

            // Find indexes of all attributes - value pairs with the same attribute name
            let allAttributes = document.querySelectorAll('.attribute-element-name')
            selectedAttributeIndexes = []
            for (let j = 0; j < allAttributes.length; j++) {
                console.log('adding elements', allAttributes[j].innerHTML, getCookie('imageAttributeName'))
                if (allAttributes[j].innerHTML === getCookie('imageAttributeName')) {
                    console.log('adding elements')
                    selectedAttributeIndexes.push(j)
                }
            }

            generateMetadata()
            console.log(rarities)
        })
        document.querySelector('.unique-name-container').append(nameDiv) 
    })

    document.getElementById('hidden-section-label').style.display = 'block'

    // Generate metadata JSON for entire collection
    // generateMetadata()
    console.log(rarities)
}

function hideAttributes () {
    document.querySelector('.unique-name-container').style.display = "none"
    document.getElementById('hidden-section-label').style.display = 'none'
}

function MetadataImage() {

    return(
        <div>
            <div className='step-three-label'>Would you like to proceed with your current Metadata selection?</div>
                <div className='step-one-buttons-container'>
                    <div className='step-one-single-button-container' onClick={selectButton} style={{marginRight: '15px'}}>
                        <div className='step-one-single-button' onClick={showAttributes}>
                            <div className='step-one-single-button-icon'>
                                <div className='step-one-single-button-icon-inner'></div>
                            </div>
                            <div>Yes</div>
                        </div>
                    </div>
                    <div className='step-one-single-button-container' onClick={selectButton} style={{marginRight: '15px'}}>
                        <div className='step-one-single-button' onClick={hideAttributes}>
                            <div className='step-one-single-button-icon'>
                                <div className='step-one-single-button-icon-inner'></div>
                            </div>
                            <div>No</div>
                        </div>
                    </div>
                </div>
            <div style={{display: 'none', marginTop: '50px'}} id='hidden-section-label' className='step-three-label'>Which attribute will determine your main NFT's image?</div> 
            <div className='unique-name-container'>
                
            </div>
        </div>
    )
}

function StepThree () {

    return (
        <div className='step-two-container'>
            <div className='step-one-heading-container'><h2>Metadata</h2></div>
            <div className='page-container' style={{flexDirection: 'column'}}>
                <div className='step-three-label'>What attributes will your collections have?</div>
                {/* <div className='metadata-description'>Most NFT collections have at least one attribute which will be assigned to all NFT's within the collection. Attributes can (and should) have varying degrees of rarity. Attributes with the same name but different values and rarity will be distributed amongst the NFT's in the collection based on their rarity level. </div> */}
                <div className="metadata-attributes-modal">
                    <div className="metadata-attributes-header">
                        <div>Attribute Name</div>
                        <div>Attribute Value</div>
                        <div>Attribute Rarity</div>
                    </div>
                </div>
                    <AttributeInputList/>
                <div className='step-three-label'>Connect uploaded assets to your attributes</div>
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