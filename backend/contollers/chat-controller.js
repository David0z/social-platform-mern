const Post = require("../models/postModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const Hashtag = require("../models/hashtagModel");
const mongoose = require("mongoose");

const chat_getAllChats = async (req, res) => {
  try {
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
  } catch (error) {}
};

const chat_sendMessage = async (req, res) => {
  try {
    let { conversationId } = req.body;
    const { sender, recepient, messageBody } = req.body;

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
      await Chat.findByIdAndUpdate(conversationId, {
        $push: {
          messages: {
            body: messageBody,
            author: sender,
          },
        },
      });
    }

    res.status(200).json({ sentMessage: { ...req.body, conversationId } });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  chat_getAllChats,
  chat_getSingleConversation,
  chat_sendMessage,
};
