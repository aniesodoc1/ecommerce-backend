const chatModel = require('../../models/chatModel');

exports.getNotificationNumber = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const number = await chatModel.countDocuments({
      users: tokenUserId,
      seenBy: { $ne: tokenUserId },
    });

    res.status(200).json(number);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get notification numbers!" });
  }
};
