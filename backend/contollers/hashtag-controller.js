const Post = require("../models/postModel");
const User = require("../models/userModel");
const Hashtag = require("../models/hashtagModel");
const mongoose = require("mongoose");

const hashtag_getSingle = async (req, res) => {
  try {
    const { tagName } = req.params;
    const hashtag = await Hashtag.aggregate([
      { $match: { name: `#${tagName}` } },
      {
        $lookup: {
          from: "posts",
          localField: "posts",
          foreignField: "_id",
          as: "posts",
          pipeline: [
            { $sort: { createdAt: -1 } },
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
            {$unwind: "$creator"},
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
    ]);

    if (hashtag.length === 0) {
      throw new Error("Could not find the hashtag")
    }

    const userId = req.body.userId
    let followedHashtags;
  
    if (userId) {
      console.log(userId);
      const user = await User.findById(userId, 'followedHashtags')
      followedHashtags = user.followedHashtags
    }

    res.status(200).json({ hashtag: hashtag[0], followedHashtags });
  } catch (error) {
    res.status(401).json({ message: error.message || "Unauthorized" });
  }
};

const hashtag_followSingle = async (req, res) => {
  try {
    const authUser = await User.findById(req.user.userId);

    if (!authUser) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const hashtagId = req.params.id
    const userId = req.user.userId

    const hashtag = await Hashtag.findById(mongoose.Types.ObjectId(hashtagId))

    let result;
    
    if (!hashtag.followers.includes(userId)) {
      hashtag.followers.push(userId)
      authUser.followedHashtags.push(hashtagId)
      result = "followed"
    } else {
      hashtag.followers.pull(userId)
      authUser.followedHashtags.pull(hashtagId)
      result = "unfollowed"
    }
    
    await authUser.save()
    await hashtag.save()

    res.status(200).json({ hashtagId, result });
    
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = {
  hashtag_getSingle,
  hashtag_followSingle
};
