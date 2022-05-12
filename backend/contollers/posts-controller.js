const Post = require('../models/postModel')
const User = require('../models/userModel')

// GET ALL POSTS
const posts_getAll = (req, res) => {
  res.send('Get All Posts')
}

// CREATE A NEW POST
const posts_postNew = async (req, res) => {
  const {creator, content, image} = req.body

  try {
    const post = await Post.create({
      creator,
      content,
      image: image || "",
      votes: 0,
      comments: []
    })

    const user = await User.findById(creator)

    user.posts.push(post)
    await user.save()

    res.status(201).json({message: "Post added successfully!", post})
  } catch (error) {
    console.log(error);
    res.status(401).json({message: error.message})
  }
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