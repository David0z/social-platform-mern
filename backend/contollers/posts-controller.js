// GET ALL POSTS
const posts_getAll = (req, res) => {
  res.send('Get All Posts')
}

// CREATE A NEW POST
const posts_postNew = (req, res) => {
  res.send('Post a new post')
}

// GET A SINGLE POST BY ID
const posts_getSingle = (req, res) => {
  res.send(`Get a single post - ID: ${req.params.id}`)
}

// EDIT A SINGLE POST BY ID
const posts_editSingle = (req, res) => {
  res.send(`Edit a single post - ID: ${req.params.id}`)
}

// COMMENT A SINGLE POST BY ID
const posts_commentSingle = (req, res) => {
  res.send(`Comment a single post - ID: ${req.params.id}`)
}

module.exports = {
  posts_getAll,
  posts_postNew,
  posts_getSingle,
  posts_editSingle,
  posts_commentSingle
}