const userModel = require ("../../models/userModel");

exports.getUserByPhoneNumber = async (req, res) => {
  try {
    console.log("Received phone:", req.params.phoneNumber); // <-- from params now
    const user = await userModel.findOne({ phonenumber: req.params.phoneNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch user!" });
  }
};

