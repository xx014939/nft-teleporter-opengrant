const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = asyncHandler ( async (req, res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      email_address: req.body.email_address,
      public_key: req.body.public_key,
      private_key: req.body.private_key,
      wallet_chain: req.body.wallet_chain
    })
    try {
      const newUser = await user.save()
      res.status(201).json(newUser)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

const loginUser = asyncHandler( async (req, res) => {
    res.json({message: 'User Successfully Logged In'})
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

module.exports = {
    registerUser,
    loginUser,
    getUser
}