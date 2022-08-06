import Header from "./Header";
import '../styles/AccountPage.css';

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
            <div className="account-page-rhs-container"></div>
         </div>
     </div>
 );
}

export default AccountPage 