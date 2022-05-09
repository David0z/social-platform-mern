// CREATE A NEW USER
const users_create = (req, res) => {
  res.send('Create a new user')
}

// GET A SINGLE USER BY ID
const users_getUser = (req, res) => {
  res.send(`Get Single User - ID: ${req.params.id}`)
}

// EDIT A SINGLE USER BY ID
const users_editUser = (req, res) => {
  res.send(`Edit Single User - ID: ${req.params.id}`)
}

module.exports = {
  users_create,
  users_getUser,
  users_editUser
}