const Post = require("../models/postModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const Hashtag = require("../models/hashtagModel");
const mongoose = require("mongoose");

const MESSAGES_PER_FETCH_LIMIT = 20;

const chat_getAllChats = async (req, res) => {
  try {
    const authUser = await User.findById(req.user.userId);

    if (!authUser) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const userId = req.user.userId;

    const user = await User.aggregate([
      {$match: {_id: mongoose.Types.ObjectId(userId)}},
      {$project: {chats: 1}},
      {$lookup: {
        from: 'chats',
        localField: 'chats',
        foreignField: '_id',
        pipeline: [
          {$sort: {"messages.createdAt": -1}},
          {$set: {messages: {$slice: ["$messages", -1]}}},
          {$lookup: {
            from: 'users',
            localField: 'participants',
            foreignField: '_id',
            pipeline: [
              {$project: {_id: 1, name: 1, image: 1}}
            ],
            as: 'participants'
          }}
        ],
        as: 'chats',
      }},
    ])

    res.status(200).json({ chats: user[0].chats });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const chat_getSingleConversation = async (req, res) => {
  try {
    const authUser = await User.findById(req.user.userId);

    if (!authUser) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const { conversationId } = req.params
    const page = parseInt(req.query.page);
    // const conversation = await Chat.findById(conversationId).populate([
    //   {path: "participants", select: {_id: 1, name: 1, image: 1}}
    // ])

    const conversation = await Chat.aggregate([
      {$match: {_id: mongoose.Types.ObjectId(conversationId)}},
      {$lookup: {
        from: 'users',
        localField: 'participants',
        foreignField: '_id',
        pipeline: [
          {$project: {_id: 1, name: 1, image: 1}}
        ],
        as: 'participants',
      }},
      {$set: {messages: {$reverseArray: "$messages"}}},
      {$set: {messages: {$slice: ["$messages", page * MESSAGES_PER_FETCH_LIMIT, MESSAGES_PER_FETCH_LIMIT]}}},
      {$set: {messages: {$reverseArray: "$messages"}}}
    ])

    if (!conversation[0].participants.find(p => p._id.toString() === req.user.userId)) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const hasMore = conversation[0].messages.length < MESSAGES_PER_FETCH_LIMIT ? false : true;

    res.status(200).json({ conversation: conversation[0], userId: req.user.userId, hasMore });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const chat_sendMessage = async (req, res) => {
  try {
    const authUser = await User.findById(req.user.userId);

    if (!authUser) {
      res.status(401);
      throw new Error("User not authorized");
    }

    let { conversationId } = req.body;
    const { sender, recepient, messageBody } = req.body;

    if(sender !== req.user.userId) {
      res.status(401);
      throw new Error("User not authorized");
    }

    if (!conversationId) {
      const chat = await Chat.create({
        participants: [
          mongoose.Types.ObjectId(sender),
          mongoose.Types.ObjectId(recepient),
        ],
        messages: [
          {
            body: messageBody,
            author: sender,
          },
        ],
      });

      await User.updateMany(
        {
          _id: [
            mongoose.Types.ObjectId(sender),
            mongoose.Types.ObjectId(recepient),
          ],
        },
        { $push: { chats: chat.id } }
      );

      conversationId = chat.id;
    } else {

      if (!authUser.chats.find(c => c.toString() === conversationId)) {
        res.status(401);
        throw new Error("User not authorized");
      }

      await Chat.findByIdAndUpdate(conversationId, {
        $push: {
          messages: {
            body: messageBody,
            author: sender,
          },
        },
      });
    }

    res.status(200).json({ sentMessage: { ...req.body, conversationId, senderData: {
      _id: authUser._id,
      name: authUser.name,
      image: authUser.image
    } } });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  chat_getAllChats,
  chat_getSingleConversation,
  chat_sendMessage,
};
