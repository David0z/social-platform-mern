const Post = require("../models/postModel");
const User = require("../models/userModel");
const Hashtag = require("../models/hashtagModel");

// -------------------------------------------------------------------------------------
// error handler function
const handleErrors = (err) => {
  let errors = { content: "" };

  if (err.message.toLowerCase().includes("post validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// -------------------------------------------------------------------------------------
// GET ALL POSTS
const posts_getAll = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      { $sort: { createdAt: -1 } },
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
    ]);

    res.status(200).json({ posts });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// -------------------------------------------------------------------------------------
// CREATE A NEW POST
const posts_postNew = async (req, res) => {
  const { creator, content, image } = req.body;

  try {
    const authUser = await User.findById(req.user.userId);

    if (!authUser) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const user = await User.findById(creator);
    const image = req.file ? req.file.path : "";
    const listOfHashtags = Array.from(new Set(content.match(/(#\w+)/gim)));
    let hashtags = [];

    const post = new Post({
      creator,
      content,
      image,
      votes: {
        upvotes: [],
        downvotes: [],
      },
      comments: [],
      hashtags,
    });

    if (listOfHashtags.length > 0) {
      await Hashtag.bulkWrite(
        listOfHashtags.map((hashtag) => ({
          updateOne: {
            filter: { name: hashtag },
            update: { $push: { posts: post.id } },
            upsert: true,
          },
        }))
      );

      hashtags = await Hashtag.find(
        { name: { $in: listOfHashtags } },
        { name: 1, _id: 1 }
      );

      hashtags.forEach((hash) => post.hashtags.push(hash._id));
    }

    await post.save();

    user.posts.push(post);
    await user.save();

    res.status(201).json({
      message: "Post added successfully!",
      post: {
        ...post.toObject(),
        creator: { name: user.name, image: user.image, _id: user.id },
        hashtags,
        commentCounter: 0,
      },
    });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

// -------------------------------------------------------------------------------------
// GET A SINGLE POST BY ID
const posts_getSingle = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate([
      { path: "creator", select: { name: 1, image: 1 } },
      {
        path: "comments",
        populate: { path: "author", select: { name: 1, image: 1 } },
        sort: { createdAt: 1 },
      },
    ]);

    res.status(200).json({
      post: { ...post.toObject(), commentCounter: post.comments.length },
    });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// -------------------------------------------------------------------------------------
// EDIT A SINGLE POST BY ID
const posts_editSingle = (req, res) => {
  res.send(`Edit a single post - ID: ${req.params.id}`);
};

// -------------------------------------------------------------------------------------
// COMMENT A SINGLE POST BY ID
const posts_commentSingle = async (req, res) => {
  try {
    const authUser = await User.findById(req.user.userId);

    if (!authUser) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const postId = req.params.id;

    const comment = req.body;

    const post = await Post.findById(postId);
    post.comments.push(comment);

    const newComment = post.comments[post.comments.length - 1];

    await post.save();

    res.status(200).json({ comment: newComment, postId }); //return postid to know which post to comment
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// -------------------------------------------------------------------------------------
// VOTE FOR A SINGLE POST

const posts_voteForSingle = async (req, res) => {
  try {
    const authUser = await User.findById(req.user.userId);

    if (!authUser) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const postId = req.params.id;
    const { userId, action } = req.body;

    const post = await Post.findById(postId);

    switch (action) {
      case "upvote":
        if (
          post.votes.downvotes !== [] &&
          post.votes.downvotes.find((uid) => uid.toString() === userId)
        ) {
          post.votes.downvotes.pull(userId);
          post.votes.upvotes.push(userId);
        } else if (
          post.votes.upvotes !== [] &&
          post.votes.upvotes.find((uid) => uid.toString() === userId)
        ) {
          post.votes.upvotes.pull(userId);
        } else {
          post.votes.upvotes.push(userId);
        }
        break;
      case "downvote":
        if (
          post.votes.upvotes !== [] &&
          post.votes.upvotes.find((uid) => uid.toString() === userId)
        ) {
          post.votes.upvotes.pull(userId);
          post.votes.downvotes.push(userId);
        } else if (
          post.votes.downvotes !== [] &&
          post.votes.downvotes.find((uid) => uid.toString() === userId)
        ) {
          post.votes.downvotes.pull(userId);
        } else {
          post.votes.downvotes.push(userId);
        }
        break;
      default:
        throw new Error("Invalid vote action");
    }

    await post.save();

    res.status(200).json({
      message: "Vote submited successfully!",
      vote: {
        action,
        userId,
        postId,
      },
    });
  } catch (error) {
    res.status(404).json({ message: error.message || "Something went wrong" });
  }
};

// -------------------------------------------------------------------------------------
// GET VOTES OF A SINGLE POST

const posts_getVotes = async (req, res) => {
  try {
    const postId = req.params.id;

    const votes = await Post.findById(postId, "votes").populate({
      path: "votes",
      populate: [
        { path: "upvotes", select: { name: 1, id: 1, image: 1 } },
        { path: "downvotes", select: { name: 1, id: 1, image: 1 } },
      ],
    });

    res.status(200).json({ votes: votes.votes, postId });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// -------------------------------------------------------------------------------------
// GET ALL COMMENTS OF A SINGLE POST

const posts_getComments = async (req, res) => {
  try {
    const postId = req.params.id;

    const comments = await Post.findById(postId, "comments").populate({
      path: "comments",
      populate: {
        path: "author",
        select: { _id: 1, name: 1, image: 1 },
      },
    });

    res.status(200).json({ comments: comments.comments, postId });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// -------------------------------------------------------------------------------------
// GET ALL HOT POSTS

const posts_getHotPosts = async (req, res) => {
  const { hotNumber } = req.params;

  try {
    const posts = await Post.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date() - hotNumber * 60 * 60 * 1000),
          },
        },
      },
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
        $set: {
          comments: [],
          commentCounter: { $size: "$comments" },
          votesCounter: {
            $add: [{ $size: "$votes.upvotes" }, { $size: "$votes.downvotes" }],
          },
        },
      },
      { $sort: { votesCounter: -1 } },
      { $project: { votesCounter: 0 } },
    ]);

    res.status(200).json({ posts });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  posts_getAll,
  posts_postNew,
  posts_getSingle,
  posts_editSingle,
  posts_commentSingle,
  posts_voteForSingle,
  posts_getVotes,
  posts_getComments,
  posts_getHotPosts,
};
