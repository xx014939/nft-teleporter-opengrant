import '../styles/AccountPage.css';
import Header from "./Header";
import Footer from "./Footer"
import userSVG from '../userSVG.svg'
import idSVG from '../idSVG.svg'
import emailSVG from '../emailSVG.svg'
import hashSVG from '../hashSVG.svg'
import pencilSVG from '../pencilSVG.svg'
import passwordSVG from '../passwordSVG.svg'

function AccountInputBox (props) {
    return (
        <div className='account-page-input-container'>
            <div className='account-page-input-label'>{props.Label}</div>
            <div className='account-page-input-subcontainer'>
                <div className="account-page-icon"><img src={props.Icon}/></div>
                <input type="text" placeholder={props.Label} label={props.Description}></input>
                <div className="account-page-icon-rhs"><img src={pencilSVG}/></div>
            </div>
        </div>
    )
}

function PasswordInputBox (props) {
    return (
        <div className='account-page-input-container' style={{marginTop: '40px'}}>
            <div className='account-page-input-label'>{props.Label}</div>
            <div className='account-page-input-subcontainer'>
                <input className='password-input' type="text"></input>
                <div className="account-page-icon-rhs" style={{marginTop: '0.5px'}}><img src={passwordSVG}/></div>
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
                    </div>
                    <div className="account-page-title">
                        Security
                    </div>
                    <div className="account-page-subtitle">
                        Password
                    </div>
                    <PasswordInputBox Label = "Current Password" />
                    <PasswordInputBox Label = "New Password" />
                    <PasswordInputBox Label = "Confirm New Password" />
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