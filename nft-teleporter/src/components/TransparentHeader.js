import '../styles/Header.css'
import logo from '../logo.svg'

function Header () {
    return (
        <div className='transparent-header-container'>
            <div className='header-logo'>
                <img src={logo} />
            </div>
        </div>
    )
}

export default Header;