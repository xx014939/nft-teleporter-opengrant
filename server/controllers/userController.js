const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const e = require('cors')

const registerUser = asyncHandler ( async (req, res) => {

    const {email_address, password} = req.body
    // Check if user already exists
    const userExists = await User.findOne({email_address})

    if (userExists) {
        res.status(400).json({ message: 'User Exists' })
    } else {

        // Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email_address: req.body.email_address,
            public_key: req.body.public_key,
            private_key: req.body.private_key,
            wallet_chains: req.body.wallet_chains
          })
          try {
            const newUser = await user.save()
            res.status(201).json({
                __id: user.id, 
                name: user.username,
                email: user.email_address,
                token: generateToken(user._id)
            })
          } catch (err) {
            res.status(400).json({ message: err.message })
          }
    }
  })

const loginUser = asyncHandler( async (req, res) => {
    const {username, password} = req.body

    // Locate user
    const user = await User.findOne({username})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
        message: 'User Successfully Logged In',
        token: generateToken(user._id),
        id: user._id,
        username: user.username
        })
    } else {
        res.status(400)
        throw new Error('Password Incorect')
    }
})

const getUser = asyncHandler(async (req, res, next) => {
    let user
    try {
      user = await User.findById(req.params.id)
      if (user == null) {
        return res.status(404).json({ message: 'Cannot find user' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.user = user
    next()
  })

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '30d'})
}

// Deploy smart contract
const deploySmartContract = () => {
  /* 1. Get Ethereum Account */
  const [account] = await web3.eth.getAccounts();
  return account
}


module.exports = {
    registerUser,
    loginUser,
    getUser,
    deploySmartContract
}