const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 6 
  },
  image: { 
    type: String, 
    required: false
  },
  posts: [{ 
    type: mongoose.Types.ObjectId, 
    required: true, 
    ref: 'Post' 
  }]
});

module.exports =  mongoose.model('User', userSchema)