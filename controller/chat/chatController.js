const chatModel = require("../../models/chatModel");
const userModel = require("../../models/userModel");

exports.getChats = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    // Find all chats where user is a participant, sort by newest
    const chats = await chatModel.find({ users: tokenUserId })
      .sort({ createdAt: -1 })
      .populate("users", "phonenumber profilePic name");

    // Attach receiver info (the other participant)
    const formattedChats = chats.map(chat => {
      const receiver = chat.users.find(user => user._id.toString() !== tokenUserId);
      return {
        ...chat.toObject(),
        receiver
      };
    });

    res.status(200).json(formattedChats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

// GET a single chat by ID
exports.getChat = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.id;

  try {
    const chat = await chatModel.findOne({
      _id: chatId,
      users: tokenUserId
    })
    .populate("messages")
    .populate("users", "phonenumber profilePic name");

    if (!chat) {
      return res.status(404).json({ message: "Chat not found!" });
    }

    const receiver = chat.users.find(user => user._id.toString() !== tokenUserId);

    // Mark as seen if necessary
    if (!chat.seenBy.includes(tokenUserId)) {
      chat.seenBy.push(tokenUserId);
      await chat.save();
    }

    res.status(200).json({ ...chat.toObject(), receiver });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

// ADD a new chat (or fetch existing one)
exports.addChat = async (req, res) => {
  const tokenUserId = req.userId;
  const { receiverId } = req.body;

  try {
    // Check if chat exists between these users
    let chat = await chatModel.findOne({
      users: { $all: [tokenUserId, receiverId] }
    })
    .populate("messages")
    .populate("users", "phonenumber profilePic name");

    if (!chat) {
      // Create new chat
      chat = await chatModel.create({
        users: [tokenUserId, receiverId]
      });

      // Populate for response
      await chat.populate("users", "phonenumber profilePic name");
    }

    const receiver = chat.users.find(user => user._id.toString() !== tokenUserId);

    res.status(200).json({ ...chat.toObject(), receiver });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add chat!" });
  }
};


// MARK a chat as read
exports.readChat = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.id;

  try {
    const chat = await chatModel.findOne({
      _id: chatId,
      users: tokenUserId
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found!" });
    }

    // Mark this chat as seen by the current user
    if (!chat.seenBy.includes(tokenUserId)) {
      chat.seenBy.push(tokenUserId);
      await chat.save();
    }

    res.status(200).json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to mark chat as read!" });
  }
};
