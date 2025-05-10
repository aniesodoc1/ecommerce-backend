async function userLogout(req,res) {
    try {
        res.clearCookie("token")

        res.json({
            data: [],
            error: false,
            success: true,
            message : "Logged out successfully"
        })
        
    } catch (err) {
        res.json({
            message:  err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = userLogout