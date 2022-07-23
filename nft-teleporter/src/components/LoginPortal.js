import logo from '../logo.svg';
import '../App.css';
import ReactDOM from 'react-dom/client';

// const root = ReactDOM.createRoot(
//     document.getElementById('adjacent')
//   );

function RegisterOrLogin(props) {
    return (
        <div className='lhs-inner'>
            <div><img alt='NFT Teleporter Logo' src={logo}/></div>
            <div className="button-container">
                <div><a onClick={loginView} className='button' href='#'>Login</a></div>
                <div><a onClick={registerView} className='button' href='#'>Register</a></div>
            </div>
        </div>
    )
}

function ShowLogin(props) {
    return (
        <div className='lhs-inner-two'>
            <div><img alt='NFT Teleporter Logo' src={logo}/></div>
            <div className='lhs-inner-two-text'>
                <div><h2>Login</h2></div>
                <div><input className='input-field' placeholder='Username' label="Username"></input></div>
                <div><input className='input-field' placeholder='Password' label="Password"></input></div>
                <div><a href='/account' className='button' onClick={accountView}>Login</a></div>
            </div>
        </div>
    )
}

function ShowRegister(props) {
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
}

function LoginPortal(props) {
    const stateCount = props.stateCount;
    if(stateCount === 1) {
        return <RegisterOrLogin/>
    } else if (stateCount === 2) {
        return <ShowLogin/>
    } else {
        <ShowRegister/>
    }
}



function loginView() {
    root.render(<LoginPortal stateCount={2}/>)
}

function registerView () {
    root.render(<LoginPortal stateCount={3}/>)
}

function accountView () {
    console.log('Go to account')
}


root.render(<LoginPortal stateCount={1}/>)

export default LoginPortal;