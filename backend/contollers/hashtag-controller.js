const Post = require("../models/postModel");
const User = require("../models/userModel");
const Hashtag = require("../models/hashtagModel");
const mongoose = require("mongoose");

const POSTS_PER_PAGE_LIMIT = 10;

// -------------------------------------------------------------------------------------
// GET A SINGLE HASHTAG
const hashtag_getSingle = async (req, res) => {
  try {
    const page = req.query.page;
    const date = req.query.date;
    const { tagName } = req.params;
    const userId = req.body.userId;
    const hashtag = await Hashtag.aggregate([
      { $match: { name: `#${tagName}` } },
      {
        $lookup: {
          from: "posts",
          localField: "posts",
          foreignField: "_id",
          as: "posts",
          pipeline: [
            {$match: {createdAt: {$lte: new Date(date)}}},
            { $sort: { createdAt: -1 } },
            { $skip: page * POSTS_PER_PAGE_LIMIT},
            { $limit: POSTS_PER_PAGE_LIMIT},
            { $set: { comments: [], commentCounter: { $size: "$comments" } } },
            {
              $lookup: {
                from: "users",
                localField: "creator",
                foreignField: "_id",
                pipeline: [{ $project: { _id: 1, name: 1, image: 1 } }],
                as: "creator",
              },
            },
            { $unwind: "$creator" },
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
        },
      },
      { $set: {isUserFollowing: {$in: [mongoose.Types.ObjectId(userId), "$followers"]}, followers: {$size: "$followers"}}},
    ]);

    if (hashtag.length === 0) {
      throw new Error("Could not find the hashtag");
    }

    const hasMore = hashtag[0].posts.length < POSTS_PER_PAGE_LIMIT ? false : true;

    res.status(200).json({ hashtag: hashtag[0], hasMore });
  } catch (error) {
    res.status(401).json({ message: error.message || "Unauthorized" });
  }
};

// -------------------------------------------------------------------------------------
// FOLLOW A SINGLE HASHTAG
const hashtag_followSingle = async (req, res) => {
  try {
    const authUser = await User.findById(req.user.userId);

    if (!authUser) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const hashtagId = req.params.id;
    const userId = req.user.userId;

    const hashtag = await Hashtag.findById(mongoose.Types.ObjectId(hashtagId));

    let result;

    if (!hashtag.followers.includes(userId)) {
      hashtag.followers.push(userId);
      authUser.followedHashtags.push(hashtagId);
      result = "followed";
    } else {
      hashtag.followers.pull(userId);
      authUser.followedHashtags.pull(hashtagId);
      result = "unfollowed";
    }

    await authUser.save();
    await hashtag.save();

    res.status(200).json({ hashtagId, result });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// -------------------------------------------------------------------------------------
// GET A LIST POPULAR AND FOLLOWED HASHTAGS
const hashtag_getPopular = async (req, res) => {
  try {
    const { userId } = req.body;

    let followedHashtags = [];

    if (userId) {
      const user = await User.findById(userId, "followedHashtags").populate([
        { path: "followedHashtags", select: { name: 1 } },
      ]);

      followedHashtags = user.followedHashtags;
    }

    const popularHashtags = await Post.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
          },
          hashtags: { $not: { $size: 0 } },
        },
      },
      {
        $unwind: "$hashtags",
      },
      { $group: { _id: "$hashtags", count: { $sum: 1 } } },
      {
        $lookup: {
          from: "hashtags",
          localField: "_id",
          foreignField: "_id",
          pipeline: [{ $project: { name: 1 } }],
          as: "name",
        },
      },
      {
        $unwind: "$name",
      },
      { $set: { name: "$name.name" } },
      { $sort: { count: -1 } },
      { $limit: 10}
    ]);

    res.status(200).json({ followedHashtags, popularHashtags });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// -------------------------------------------------------------------------------------
// GET POSTS FROM FOLLOWED HASHTAGS
const hashtag_getFollowed = async (req, res) => {
  try {
    const page = req.query.page;
    const date = req.query.date;
    const { userId } = req.params;

    const posts = await User.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(userId) } },
      { $project: { followedHashtags: 1, _id: 0 } },
      { $unwind: "$followedHashtags" },
      {
        $lookup: {
          from: "hashtags",
          localField: "followedHashtags",
          foreignField: "_id",
          pipeline: [{ $project: { posts: 1, _id: 0 } }, {$unwind: "$posts"}],
          as: "followedHashtags",
        },
      },
      { $unwind: "$followedHashtags" },
      { $set: {followedHashtags: "$followedHashtags.posts"}},
      {$group: {_id: "$followedHashtags"}},
      {$lookup: {
        from: "posts",
          localField: "_id",
          foreignField: "_id",
          pipeline: [
            { $match: {createdAt: {$lte: new Date(date)}}},
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
      {$sort: {"_id.createdAt": -1}},
      { $skip: page * POSTS_PER_PAGE_LIMIT},
      { $limit: POSTS_PER_PAGE_LIMIT}
    ]);

    const formatedPosts = posts.map(post => post._id)

    const hasMore = formatedPosts.length < POSTS_PER_PAGE_LIMIT ? false : true;

    res.status(200).json({ posts: formatedPosts, hasMore });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// -------------------------------------------------------------------------------------
module.exports = {
  hashtag_getSingle,
  hashtag_followSingle,
  hashtag_getPopular,
  hashtag_getFollowed,
};
