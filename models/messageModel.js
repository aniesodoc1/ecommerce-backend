const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chat",
    required: true
  }
}, { timestamps: true })

const messageModel = mongoose.model("message", messageSchema)
module.exports = messageModel
