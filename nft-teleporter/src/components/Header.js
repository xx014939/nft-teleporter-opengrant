import '../styles/Header.css'
import logo from '../logo.svg'

function Header () {
    return (
        <div className='header-container'>
            <div className='header-logo'>
                <img src={logo} />
            </div>
            <div className='header-linklist'>
                <div>About Us</div>
                <div>How It Works</div>
            </div>
            <div className='header-create-collection-container'>
                <div className='header-create-collection-inner'>
                    <a href='#'>Create Collection</a>
                </div>
            </div>
        </div>
    )
}

export default Header;