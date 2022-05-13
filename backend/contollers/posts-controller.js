const Post = require('../models/postModel')
const User = require('../models/userModel')

// error handler function
const handleErrors = (err) => {
  let errors = { content: '' };

  if (err.message.toLowerCase().includes("post validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// GET ALL POSTS
const posts_getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort({createdAt: -1})

    res.status(200).json({posts})
  } catch (error) {
    res.status(401).json({message: 'Unauthorized'})
  }
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
    const errors = handleErrors(error);
    res.status(400).json({ errors });
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