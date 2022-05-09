const User = require('../models/userModel')

// SIGNUP A NEW USER
const users_signup = (req, res) => {
  res.send('Create/Signup a new user')
}

// LOGIN AN EXISTING USER

const users_login = (req, res) => {
  res.send('Login an existing user')
}

// GET A SINGLE USER BY ID
const users_getUser = async (req, res) => {
  const existingUser = await User.findById(req.params.id)
  res.json({user: existingUser.toObject({getters: true})})
}

// EDIT A SINGLE USER BY ID
const users_editUser = (req, res) => {
  res.send(`Edit Single User - ID: ${req.params.id}`)
}

module.exports = {
  users_signup,
  users_login,
  users_getUser,
  users_editUser
}