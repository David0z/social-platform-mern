const Post = require("../models/postModel");
const User = require("../models/userModel");
const Hashtag = require("../models/hashtagModel");
const mongoose = require("mongoose");

const chat_getAllChats = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}

const chat_getSingleConversation = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}

const chat_sendMessage = async (req, res) => {
  try {
    
    // res.status(200).json({  });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = {
  chat_getAllChats,
  chat_getSingleConversation,
  chat_sendMessage
};
