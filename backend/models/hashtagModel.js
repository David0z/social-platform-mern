const mongoose = require("mongoose");

const hashtagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
      },
    ],
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User"
      }
    ]
  }
);

module.exports = mongoose.model("Hashtag", hashtagSchema);