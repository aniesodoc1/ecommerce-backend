const mongoose = require(`mongoose`)

const userSchema = new mongoose.Schema({
    name: String,
    phonenumber: {
        type: String,
        unique: true,
        require: true
    },
    password : String,
    profilePic : String,
    role : String
}, {
    timestamps : true
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel