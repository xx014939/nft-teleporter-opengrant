const express = require("express");
const User = require('../models/userModel')
const cors = require('cors') 
 
// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
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
 
// Getting One
router.get('/:id', getUser, (req, res) => {
  res.json(res.user)
})

// Creating one
router.post('/create', async (req, res) => {
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
 
async function getUser(req, res, next) {
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
}

module.exports = router;