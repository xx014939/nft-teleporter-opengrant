import '../styles/AccountPage.css';
import 'react-phone-number-input/style.css'
import React, {useState} from 'react';
import PhoneInput from 'react-phone-number-input'
import Header from "./Header";
import Footer from "./Footer"
import userSVG from '../userSVG.svg'
import idSVG from '../idSVG.svg'
import emailSVG from '../emailSVG.svg'
import hashSVG from '../hashSVG.svg'
import pencilSVG from '../pencilSVG.svg'
import passwordSVG from '../passwordSVG.svg'
import infoSVGGray from '../infoSVGGray.svg'
import nftcollectionSVG from '../nftcollectionSVG.svg'
import solanaSVG from '../solanaSVG.svg'
import ctaArrowSVG from '../ctaArrowSVG.svg'
import leftArrowSVG from '../leftArrowSVG.svg'

function PhoneInputBox() {
    const [value, setValue] = useState()
    return (
      <PhoneInput
        defaultCountry="US"
        placeholder="Phone Number"
        value={value}
        onChange={setValue}/>
    )
  }

function AccountInputBox (props) {
    return (
        <div className='account-page-input-container'>
            <div className='account-page-input-label'>{props.Label}</div>
            <div className='account-page-input-subcontainer'>
                <div className="account-page-icon"><img src={props.Icon} alt="Account icon"/></div>
                <input type="text" placeholder={props.Label} label={props.Description}></input>
                <div className="account-page-icon-rhs"><img src={pencilSVG} alt="Pencil icon"/></div>
            </div>
        </div>
    )
}

function showPassword (inputNumber) {
    let inputs = document.querySelectorAll('.password-input')
    if (inputs[inputNumber - 1].type === 'text') {
        inputs[inputNumber - 1].type = 'password'
    } else {
        inputs[inputNumber - 1].type = 'text'
    }
}

function PasswordInputBox (props) {
    return (
        <div className='account-page-input-container' style={{marginTop: '40px'}}>
            <div className='account-page-input-label'>{props.Label}</div>
            <div className='account-page-input-subcontainer'>
                <input className='password-input' type="password"></input>
                <div className="account-page-icon-rhs show-password" style={{marginTop: '0.5px'}} onClick={() => {showPassword(props.Number)}}>
                    <img src={passwordSVG} alt="Password icon"/>
                </div>
            </div>
        </div>
    )
}

function CollectionCard() {
    return (
        <div className='nft-collections-card-container'>
             <div className='nft-collection-card-image-container'>
                <img src={nftcollectionSVG}/>
            </div>
            <div className='nft-collections-card-chains'>
                <div className='nft-collections-card-chains-icon'></div>
                <div className='nft-collections-card-chains-icon'></div>
            </div>
            <div className='nft-collections-card-details'>
                <div>Collection Name</div>
                <div>TOKEN SYMBOL</div>
            </div>
            <div className='nft-collection-card-price'>
                <div>
                    <div><img src={solanaSVG}/></div>
                    <div>1 SOL</div>
                </div>
                <div className='nft-collection-card-cta'>View Chains<img src={ctaArrowSVG}/></div>
            </div>
        </div>
    )
}

function AccountPage () {
 return (
     <div>
         <div><Header/></div>
         <div className="account-page-container">
            <div className="account-page-lhs-container">
                <div className="account-page-lhs-back-button">
                    <div>
                        <img src={leftArrowSVG} />
                    </div>
                    <div>Back</div>
                </div>
                <div className="account-page-lhs-progress-bar">
                    <div className="account-page-lhs-progress-bar-element">
                        <div>1</div>
                        <div>General Info</div>
                    </div>
                    <div className="account-page-lhs-progress-bar-element">
                        <div>2</div>
                        <div>Security</div>
                    </div>
                    <div className="account-page-lhs-progress-bar-element">
                        <div>3</div>
                        <div>NFT Collections</div>
                    </div>
                </div>
            </div>
            <div className="account-page-rhs-container">
                <div className="account-page-rhs-header">
                    <h2>Account</h2>
                </div>
                <div className="account-page-rhs-general-info">
                    <div className="account-page-title">
                        General Info
                    </div>
                    <div className="account-page-subtitle">
                        Profile Picture
                    </div>
                    <div className="account-page-profile-photo"></div>
                    <div className='account-page-form'>
                        <AccountInputBox Label = "Username" Description = "" Icon = {userSVG}/>
                        <AccountInputBox Label = "Wallet Address" Description = "" Icon = {hashSVG}/>
                        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between'}}>
                            <div style={{marginRight: '40px'}}>
                                <AccountInputBox Label = "First Name" Description = "" Icon = {idSVG}/>
                            </div>
                            <AccountInputBox Label = "Last Name" Description = "" Icon = {idSVG}/>
                        </div>
                        <AccountInputBox Label = "Email Address" Description = "" Icon = {emailSVG}/>
                        <div className='account-page-input-container'>
                            <div className='account-page-input-label' style={{marginBottom: '15px'}}>Phone No</div>
                            <PhoneInputBox/>
                        </div>
                    </div>
                    <div className="account-page-title">
                        Security
                    </div>
                    <div className="account-page-subtitle">
                        Password
                    </div>
                    <PasswordInputBox Label = "Current Password" Number = {1} />
                    <PasswordInputBox Label = "New Password" Number = {2} />
                    <div className='password-info-container'>
                        <div className='password-info-icon'><img src={infoSVGGray}/></div>
                        <div className='password-info-text'>Your new password must include one lower case and one upper case letter and it must be 8 characters long. </div>
                    </div>
                    <PasswordInputBox Label = "Confirm New Password" Number = {3} />
                    <a className='account-page-cta' href='#'>Update New Password</a>
                </div>
                <div>
                    <div className="account-page-subtitle" style={{marginTop: '88px', color: '#ffffff', marginBottom: '15px'}}>
                        2 Factor Authentication
                    </div>
                    <div className='password-info-text' style={{width: '400px', marginBottom: '45px'}}>
                        We&#39;ll send you a text with a code to your provided mobile number below, whenever you sign in to your account.
                    </div>
                    <div style={{marginTop: ''}}>
                        <div className='account-page-input-label'>Phone No</div>
                        <PhoneInputBox/>
                    </div>
                    <div style={{marginTop: '40px'}}>
                        <a className='account-page-cta'>Verify Phone No</a>
                    </div>
                </div>
                <div className='nft-collections-container'>
                    <div className='nft-collections-header-container'>
                    <div className='nft-collections-header'>
                        <h2>NFT Collections</h2>
                    </div>
                        <div className='nft-collections-categories-container'>
                            <div className='nft-collections-category-container'>
                                <div className='nft-collections-category'>All</div>
                            </div>
                            <div className='nft-collections-category-container'>
                                <div className='nft-collections-category'>VR/3D</div>
                            </div>
                            <div className='nft-collections-category-container'>
                                <div className='nft-collections-category'>AR</div>
                            </div>
                            <div className='nft-collections-category-container'>
                                <div className='nft-collections-category'>2D</div>
                            </div>
                        </div>
                    </div>
                    <div className='nft-collections-grid'>
                        <CollectionCard/>
                        <CollectionCard/>
                        <CollectionCard/>
                        <CollectionCard/>
                        <CollectionCard/>
                        <CollectionCard/>
                    </div>
                </div>
            </div>
         </div>
         <div style={{paddingLeft: '55px', color: "#FFFFFF", borderTop: '1px solid gray'}}>
            <Footer/>
        </div>
     </div>
 );
}

export default AccountPage 