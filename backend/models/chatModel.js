const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
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
});

module.exports = mongoose.model("Chat", chatSchema);
