import React from 'react';
import logo from '../src/logo.svg';
import ReactDOM from 'react-dom/client';
import multimedia from './multimedia.svg'
import './index.css';
import App from './App';
import './App.css';
import AccountPage from './components/AccountPage';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


const root = ReactDOM.createRoot(
  document.getElementById("root")
);

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
  return (
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
  )
}

function LoginPortal(props) {
  const stateCount = props.stateCount;
  if(stateCount === 1) {
      return (
        <>
        <div className="container">
          <div className='lhs-container'>
          <RegisterOrLogin/>
          </div>
          <div className='rhs-container'>
            <img src={multimedia}/>
          </div>
        </div>
        </>
      )
  } else if (stateCount === 2) {
    return (
      <>
      <div className="container">
        <div className='lhs-container'>
        <ShowLogin/>
        </div>
        <div className='rhs-container'>
          <img src={multimedia}/>
        </div>
      </div>
      </>
    )
  } else {
    return (
      <>
      <div className="container">
        <div className='lhs-container'>
        <ShowRegister/>
        </div>
        <div className='rhs-container'>
          <img src={multimedia}/>
        </div>
      </div>
      </>
    )
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


function StartPage() {
  return (
    <LoginPortal stateCount={1}/>
  )
}

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="account" element={<AccountPage />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
