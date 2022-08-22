import '../styles/Header.css'
import logo from '../assets/logo.svg'

function Header () {
    return (
        <div className='header-container'>
            <a className='header-logo' href='/'>
                <img src={logo} alt="NFT Teleporter"/>
            </a>
            <div className='header-linklist'>
                <div>About Us</div>
                <div>How It Works</div>
            </div>
            <div className='header-create-collection-container'>
                <div className='header-create-collection-inner'>
                    <a href='/create-collection'>Create Collection</a>
                </div>
            </div>
        </div>
    )
}

export default Header;