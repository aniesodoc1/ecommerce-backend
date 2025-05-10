const userModel = require("../../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function userSignInController (req,res) {
    try {
        const { phonenumber, password } = req.body

        if(!phonenumber){
            throw new Error("please provide phonenumber")
        }

        if(!password){
            throw new Error("please provide password")
        }
         
        const user = await userModel.findOne({phonenumber})

        if (!user){
            throw new Error("user not found")
        }

        const checkPassword = await bcrypt.compare(password,user.password)
        
        if (checkPassword){
            const tokenData = {
                _id : user._id,
                phonenumber : user.phonenumber
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '30d' })

            const tokenOption = {
                httpOnly: true,
                secure: true
            }

            res.cookie("token", token, tokenOption).json ({
                message: "Login Successfully",
                data: token,
                success: true,
                error: false
            })
        }else {
            throw new Error("Please check password")
        }
    } catch (err) {
        res.json({
            message:  err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = userSignInController