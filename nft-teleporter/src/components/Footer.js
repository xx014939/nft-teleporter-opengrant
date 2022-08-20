import '../styles/Footer.css'
import logo from '../logo.svg'

function Footer () {
    return (
        <div className='footer-container'>
            <div className='footer-lhs'>
                <div><img src={logo} alt="NFT Teleporter"/></div>
                <div className='footer-tag-line'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed iaculis diam. Duis et blandit ligula, quis ullamcorper ante.</div>
                <div className='footer-socials-container'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className='footer-rhs'>
                <div className='footer-link-columns'>
                    <div>Lorem Ipsum</div>
                    <a href='/#'>Link One</a>
                    <a href='/#'>Link Two</a>
                    <a href='/#'>Link Three</a>
                </div>
            </div>
        </div>
    )
}

export default Footer;