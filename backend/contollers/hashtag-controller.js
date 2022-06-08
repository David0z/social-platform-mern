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

    res.status(200).json({ hashtag: hashtag[0] });
  } catch (error) {
    res.status(401).json({ message: error.message || "Unauthorized" });
  }
};

module.exports = {
  hashtag_getSingle,
};
