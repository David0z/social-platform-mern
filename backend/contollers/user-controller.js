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
    const image = req.file ? req.file.path : "";
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
    const { followerId } = req.body;
    const existingUser = await User.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
      { $project: { name: 1, posts: 1, image: 1, createdAt: 1, followers: 1 } },
      {
        $set: {
          isUserFollowing: {
            $in: [mongoose.Types.ObjectId(followerId), "$followers"],
          },
          followers: { $size: "$followers" },
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "posts",
          foreignField: "_id",
          pipeline: [
            { $sort: { createdAt: -1 } },
            { $set: { comments: [], commentCounter: { $size: "$comments" } } },
            {
              $lookup: {
                from: "hashtags",
                localField: "hashtags",
                foreignField: "_id",
                pipeline: [{ $project: { _id: 1, name: 1 } }],
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
// FOLLOW A SINGLE USER BY ID
const user_followSingle = async (req, res) => {
  try {
    const authUser = await User.findById(req.user.userId);

    if (!authUser) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const userId = req.params.id;
    const followerId = req.user.userId;

    const user = await User.findById(mongoose.Types.ObjectId(userId));

    let result;

    if (!user.followers.includes(followerId)) {
      user.followers.push(followerId);
      authUser.followedUsers.push(userId);
      result = "followed";
    } else {
      user.followers.pull(followerId);
      authUser.followedUsers.pull(userId);
      result = "unfollowed";
    }

    await authUser.save();
    await user.save();

    res.status(200).json({ userId, result });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// -------------------------------------------------------------------------------------
// GET FOLLOWED USERS

const user_getFollowedUsers = async (req, res) => {
  try {
    const userId = req.user.userId;

    const posts = await User.aggregate([
      {$match: {_id: mongoose.Types.ObjectId(userId)}},
      { $project: { followedUsers: 1, _id: 0 } },
      { $unwind: "$followedUsers" },
      {
        $lookup: {
          from: "users",
          localField: "followedUsers",
          foreignField: "_id",
          pipeline: [{ $project: { posts: 1, _id: 0 } }, {$unwind: "$posts"}],
          as: "followedUsers",
        },
      },
      { $unwind: "$followedUsers" },
      { $set: {followedUsers: "$followedUsers.posts"}},
      {$group: {_id: "$followedUsers"}},
      {$lookup: {
        from: "posts",
          localField: "_id",
          foreignField: "_id",
          pipeline: [
            {
              $lookup: {
                from: "users",
                let: {
                  userId: "$creator",
                },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
                  { $project: { _id: 1, name: 1, image: 1 } },
                ],
                as: "creator",
              },
            },
            { $unwind: "$creator" },
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
            { $set: { comments: [], commentCounter: { $size: "$comments" } } },
          ],
          as: "_id"
      }},
      {$unwind: "$_id"},
      {$sort: {"_id.createdAt": -1}}
    ]);

    const formatedPosts = posts.map(post => post._id)

    res.status(200).json({ posts: formatedPosts });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

// -------------------------------------------------------------------------------------
module.exports = {
  users_signup,
  users_login,
  users_getUser,
  users_editUser,
  user_followSingle,
  user_getFollowedUsers
};
