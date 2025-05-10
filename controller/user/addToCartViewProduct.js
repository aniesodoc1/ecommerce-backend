const addToCartModel = require("../../models/cartProduct")

const addToCartViewProduct = async (req,res)=>{
    try {
        const currentUser = req.userId

        const allProduct = await addToCartModel.find({
            userId : currentUser
        }).populate("productId")

        res.json({
            data: allProduct,
            error: false,
            success: true,
            message : "Product Added In Cart"
        })
    } catch (err) {
        res.status(400).json({
            message:  err?.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = addToCartViewProduct