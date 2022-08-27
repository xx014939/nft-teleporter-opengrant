import logo from '../assets/logo.svg';
import multimedia from '../assets/multimedia.svg';
import starryBG from '../assets/starryBG.svg'
import '../App.css';
import React, { useState } from 'react';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");
const bcrypt = require('bcryptjs');

// Password encryption
const password = "mypass123"
const saltRounds = 10

function generateHash () {
    bcrypt.genSalt(saltRounds, function (saltError, salt) {
        if (saltError) {
          throw saltError
        } else {
          bcrypt.hash(password, salt, function(hashError, hash) {
            if (hashError) {
              throw hashError
            } else {
                //thisHash = hash
                console.log('The has is here -->',hash)
                return hash
            }
          })
        }
    })
}

const passwordEnteredByUser = "mypass1234"
const hash = "$2a$10$W5MQpwj9iYlbmZKmec9jiOEiSrzk9vpvRo0dXUKZ0sIMIGgY2oB4W"
let newHash = generateHash()
console.log('new hash is -->', newHash)

bcrypt.compare(passwordEnteredByUser, `${hash}`, function(error, isMatch) {
  if (error) {
    throw error
  } else if (!isMatch) {
    console.log("Password doesn't match!")
  } else {
    console.log("Password matches!")
  }
})


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

      function createWallet() {
        return web3.eth.accounts.create()
      }

      async function createUser() {

        // Save input values to variables
        let emailAddress = document.getElementById('emailRegister').value 
        let userName = document.getElementById('usernameRegister').value 
        let password = document.getElementById('passwordRegister').value 

        // Hash user password variable
        const hashedPassword = await new Promise((resolve, reject) => {
          bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) reject(err)
            resolve(hash)
          });
        })

        password = hashedPassword
        let userWallet = createWallet()
        let publicKey = userWallet.address
        let privateKey = userWallet.privateKey

        console.log('Final info is -->',emailAddress, userName, password, publicKey, privateKey)
        // Move user to login form after completing registration
        // setStepNumber(2)
      }

      return (
        <div className='lhs-inner-three'>
          <div><img alt='NFT Teleporter Logo' src={logo} style={{marginLeft: '-40px'}}/></div>
          <div className='lhs-inner-three-text'>
              <div><h2>Register</h2></div>
              <div><input className='input-field' placeholder='Email' label="Email" id='emailRegister'></input></div>
              <div><input className='input-field' placeholder='Username' label="Username" id='usernameRegister'></input></div>
              <div><input className='input-field' placeholder='Password' label="Password" id='passwordRegister'></input></div>
              <div onClick={() => {createUser()}}>
                <a href='#' className='button' id='buttonTwo'>
                  Register
                </a>
              </div>
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