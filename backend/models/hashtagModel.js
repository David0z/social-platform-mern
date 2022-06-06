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
    ]
  }
);

module.exports = mongoose.model("Hashtag", hashtagSchema);