const jwt = require("jsonwebtoken")

async function authToken(req,res,next) {
    try {
        const token = req.cookies?.token 

        if(!token){
          return res.status(200).json({
                success : false,
                error: true,
                message : "Please Login..."
            })
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded){
            console.log("decoded", decoded)

            if(err){
                console.log("error auth", err)
            }

            req.userId = decoded?._id
            next()
        })

    } catch (err) {
        res.status(400).json({
            message:  err.message || err,
            data : [],
            error: true,
            success: false
        })
    }
}

module.exports = authToken