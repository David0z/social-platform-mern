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
      upvotes: [{
        type: mongoose.Types.ObjectId,
        ref: "User",
        unique: true
      }],
      downvotes: [{
        type: mongoose.Types.ObjectId,
        ref: "User",
        unique: true
      }]
    },
    comments: [
      new mongoose.Schema(
        {
          body: {
            type: String,
          },
          author: {
            type: mongoose.Types.ObjectId,
            ref: "User",
          },
        },
        { timestamps: true }
      ),
    ],
    hashtags: [{
      type: mongoose.Types.ObjectId,
      ref: "Hashtag"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
