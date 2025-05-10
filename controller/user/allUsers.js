const userModel = require("../../models/userModel")

async function allUsers(req,res) {
    try {
        
        const allUsers = await userModel.find()

        res.status(200).json({
            data: allUsers,
            error: false,
            success: true,
            message : "all users"
        })
    } catch (err) {
        res.status(400).json({
            message:  err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = allUsers