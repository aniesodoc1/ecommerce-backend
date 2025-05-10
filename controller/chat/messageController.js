const chatModel = require("../../models/chatModel");
const messageModel = require("../../models/messageModel");

exports.addMessage = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.chatId;
  const { text } = req.body;

  try {
    // Check chat exists and user is part of it
    const chat = await chatModel.findOne({
      _id: chatId,
      users: tokenUserId,
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found!" });
    }

    // Create new message
    const message = await messageModel.create({
      text,
      userId: tokenUserId,
      chatId,
    });

    // Update chat's seenBy, lastMessage, and add message to messages array
    chat.seenBy = [tokenUserId]; // reset seenBy to current user
    chat.lastMessage = text;
    chat.messages.push(message._id);
    await chat.save();

    res.status(200).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add message!" });
  }
};
