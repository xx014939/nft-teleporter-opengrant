import logo from '../logo.svg';
import multimedia from '../multimedia.svg';
import starryBG from '../starryBG.svg'
import '../App.css';
import React, { useState } from 'react';


  function LoginPortal() {
    const [stepNumber, setStepNumber] = useState(1);

    function RegisterOrLogin(props) {
      return (
          <div className='lhs-inner'>
              <div><img alt='NFT Teleporter Logo' src={logo}/></div>
              <div className="button-container">
                  <div><a onClick={() => {setStepNumber(2)}} id="login" className='button' href='/#'>Login</a></div>
                  <div><a onClick={() => {setStepNumber(3)}} id="register" className='button' href='/#'>Register</a></div>
              </div>
          </div>
      )
    }
    
    function ShowLogin() {
      return (
          <div className='lhs-inner-two'>
              <div><img alt='NFT Teleporter Logo' src={logo}  style={{marginLeft: '-20px'}}/></div>
              <div className='lhs-inner-two-text'>
                  <div><h2>Login</h2></div>
                  <div><input className='input-field' placeholder='Username' label="Username"></input></div>
                  <div><input className='input-field' placeholder='Password' label="Password"></input></div>
                  <div><a href='/account' className='button'>Login</a></div>
              </div>
          </div>
      )
    }
    
    function ShowRegister() {
      return (
        <div className='lhs-inner-three'>
          <div><img alt='NFT Teleporter Logo' src={logo} style={{marginLeft: '-40px'}}/></div>
          <div className='lhs-inner-three-text'>
              <div><h2>Register</h2></div>
              <div><input className='input-field' placeholder='Email' label="Email"></input></div>
              <div><input className='input-field' placeholder='Username' label="Username"></input></div>
              <div><input className='input-field' placeholder='Password' label="Password"></input></div>
              <div><a href='/account' className='button'>Register</a></div>
          </div>
        </div>
      )
    }
    
    return (
      <div className="container" style={{backgroundImage: `url(${starryBG})`}}>
      <div className='lhs-container'>
        {stepNumber === 1 && <RegisterOrLogin/>}
        {stepNumber === 2 && <ShowLogin/>}
        {stepNumber === 3 && <ShowRegister/>}
      </div>
      <div className='rhs-container'>
        <img src={multimedia} alt=""/>
      </div>
    </div>
    )
  }

export default LoginPortal;