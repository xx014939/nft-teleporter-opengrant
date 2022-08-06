import Header from "./Header";
import '../styles/AccountPage.css';
import inputSVG from '../inputSVG.svg'

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
                        <div className='account-page-input-container'>
                            <div className='account-page-input-label'>Name (NFT Collection)</div>
                            <div className='account-page-input-subcontainer'>
                                <div><img src={inputSVG}/></div>
                                <input type="text" placeholder='Name' label="Enter NFT Collection's Name"></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
     </div>
 );
}

export default AccountPage 