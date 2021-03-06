const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "The password must be at least 6 characters long"],
    },
    image: {
      type: String,
    },
    posts: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Post",
      },
    ],
    followedHashtags: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Hashtag",
      },
    ],
    followedUsers: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    chats: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Chat",
      },
    ],
  },
  { timestamps: true }
);

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

module.exports = mongoose.model("User", userSchema);
