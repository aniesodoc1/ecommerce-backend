const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    }
  ],
  seenBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message"
    }
  ],
  lastMessage: {
    type: String
  }
}, {
  timestamps: true
});

const chatModel = mongoose.model("chat", chatSchema);

module.exports = chatModel;
