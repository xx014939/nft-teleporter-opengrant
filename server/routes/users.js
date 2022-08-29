const express = require("express");
const User = require('../models/userModel')
const cors = require('cors'); 
const { registerUser, getUser, loginUser } = require("../controllers/userController");
const router = express.Router();
 
// Getting all
router.get('/', cors(), async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
    console.log(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Login
router.post('/login', loginUser)
 
// Getting One
router.get('/:id', getUser, (req, res) => {
  res.json(res.user)
})

// Creating one
router.post('/register', registerUser)

// Updating One
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.username != null) {
    res.user.name = req.body.username
  }
  if (req.body.password != null) {
    res.user.password = req.body.password
  }
  if (req.body.email_address != null) {
    res.user.email_address = req.body.email_address
  }
  if (req.body.public_key != null) {
    res.user.public_key = req.body.public_key
  }
  if (req.body.private_key != null) {
    res.user.private_key = req.body.private_key
  }
  if (req.body.wallet_chain != null) {
    res.user.wallet_chain = req.body.wallet_chain
  }
  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove()
    res.json({ message: 'Deleted User' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router;