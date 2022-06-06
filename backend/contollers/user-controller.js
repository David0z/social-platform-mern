const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// -------------------------------------------------------------------------------------
// error handler function
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "", name: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate error
  if (err.code === 11000) {
    console.log(err);
    switch (Object.keys(err.keyValue)[0]) {
      case "email":
        errors.email = "Account with this email already exists";
        break;
      case "name":
        errors.name = "This username is already taken";
        break;
    }
    return errors;
  }

  // validation errors
  if (err.message.toLowerCase().includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// -------------------------------------------------------------------------------------
// create Json Web Token function
const expirationDate = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: expirationDate,
  });
};

// -------------------------------------------------------------------------------------
// SIGNUP A NEW USER
const users_signup = async (req, res) => {
  let { email, password, name, image } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const image = req.file ? req.file.path : ""
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      image,
      posts: [],
    });
    const token = createToken(user._id);
    res.status(201).json({
      message: "Signed Up Successfully!",
      user: user._id,
      token,
      image: user.image,
      userName: user.name,
    });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

// -------------------------------------------------------------------------------------
// LOGIN AN EXISTING USER

const users_login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({
      message: "Logged In Successfully!",
      user: user._id,
      token,
      image: user.image,
      userName: user.name,
    });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

// -------------------------------------------------------------------------------------
// GET A SINGLE USER BY ID
const users_getUser = async (req, res) => {
  try {
    const existingUser = await User.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
      { $project: { name: 1, posts: 1, image: 1, createdAt: 1 } },
      {
        $lookup: {
          from: "posts",
          let: {
            userId: "$_id",
          },
          pipeline: [
            { $match: { $expr: { $eq: ["$creator", "$$userId"] } } },
            { $sort: { createdAt: -1 } },
            { $set: {comments: [], commentCounter: { $size: "$comments" }}},
            {
              $lookup: {
                from: "hashtags",
                localField: "hashtags",
                foreignField: "_id",
                pipeline: [
                  {$project: { _id: 1, name: 1}}
                ],
                as: "hashtags",
              },
            },
          ],
          as: "posts",
        },
      },
    ]);

    res.status(200).json({ user: existingUser[0] });
  } catch (error) {
    res.status(404).json({ message: "Could not find this user" });
  }
};

// -------------------------------------------------------------------------------------
// EDIT A SINGLE USER BY ID
const users_editUser = (req, res) => {
  res.send(`Edit Single User - ID: ${req.params.id}`);
};

// -------------------------------------------------------------------------------------
module.exports = {
  users_signup,
  users_login,
  users_getUser,
  users_editUser,
};
