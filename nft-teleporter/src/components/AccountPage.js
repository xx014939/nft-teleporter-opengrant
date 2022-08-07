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

function AccountPage () {
 return (
     <div>
         <div><Header/></div>
         <div className="account-page-container">
            <div className="account-page-lhs-container">
                <div className="account-page-lhs-back-button">
                    <div>Icon</div>
                    <div>BACK</div>
                </div>
                <div className="account-page-lhs-progress-bar">
                    <div className="account-page-lhs-progress-bar-element">
                        <div>Icon</div>
                        <div>General Info</div>
                    </div>
                    <div className="account-page-lhs-progress-bar-element">
                        <div>Icon</div>
                        <div>Security</div>
                    </div>
                    <div className="account-page-lhs-progress-bar-element">
                        <div>Icon</div>
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
            </div>
            <div>
                <a className='account-page-cta'>Verify Phone No</a>
            </div>
         </div>
         <div style={{paddingLeft: '55px', color: "#FFFFFF", borderTop: '1px solid gray'}}>
            <Footer/>
        </div>
     </div>
 );
}

export default AccountPage 