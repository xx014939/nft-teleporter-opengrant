import logo from '../logo.svg';
import '../App.css';

function loginView() {
    console.log('clicked')
    document.querySelector('.lhs-inner').style.display = 'none'
    document.querySelector('.lhs-inner-two').style.display = 'flex'
}

function registerView () {
    document.querySelector('.lhs-inner').style.display = 'none'
    document.querySelector('.lhs-inner-three').style.display = 'flex'
}

function accountView () {
    console.log('Go to account')
}


function LoginPortal() {
  return (
    <div>
        <div className='lhs-inner'>
            <div><img alt='NFT Teleporter Logo' src={logo}/></div>
            <div className="button-container">
                <div><a onClick={loginView} className='button' href='#'>Login</a></div>
                <div><a onClick={registerView} className='button' href='#'>Register</a></div>
            </div>
        </div>
        <div className='lhs-inner-two'>
            <div><img alt='NFT Teleporter Logo' src={logo}/></div>
            <div className='lhs-inner-two-text'>
                <div><h2>Login</h2></div>
                <div><input className='input-field' placeholder='Username' label="Username"></input></div>
                <div><input className='input-field' placeholder='Password' label="Password"></input></div>
                <div><a href='/account' className='button' onClick={accountView}>Login</a></div>
            </div>
        </div>
        <div className='lhs-inner-three'>
            <div><img alt='NFT Teleporter Logo' src={logo}/></div>
            <div className='lhs-inner-two-text'>
                <div><h2>Register</h2></div>
                <div><input className='input-field' placeholder='Email' label="Email"></input></div>
                <div><input className='input-field' placeholder='Username' label="Username"></input></div>
                <div><input className='input-field' placeholder='Password' label="Password"></input></div>
                <div><a href='/account' className='button' onClick={accountView}>Register</a></div>
            </div>
        </div>
    </div>
  );
}

export default LoginPortal;