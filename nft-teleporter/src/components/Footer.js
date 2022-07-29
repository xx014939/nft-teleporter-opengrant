import '../styles/Footer.css'
import logo from '../logo.svg'

function Footer () {
    return (
        <div className='footer-container'>
            <div className='footer-lhs'>
                <div><img src={logo}/></div>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed iaculis diam. Duis et blandit ligula, quis ullamcorper ante.</div>
                <div className='footer-socials-container'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className='footer-rhs'>

            </div>
        </div>
    )
}

export default Footer;