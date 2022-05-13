const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      required: [true, "Post content cannot be empty, please fill it in"],
    },
    image: {
      type: String,
    },
    votes: {
      type: Number,
      default: 0
    },
    comments: [{
      body: {
        type: String
      },
      author: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      }
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
