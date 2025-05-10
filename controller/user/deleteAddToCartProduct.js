const addToCartModel = require("../../models/cartProduct")

const deleteAddToCartProduct = async(req,res)=> {
    try {
        const currentUserId = req.userId
        const addToCartProductId = req.body._id

        const deleteProduct = await addToCartModel.deleteOne({_id : addToCartProductId})

        res.json({
            data: deleteProduct,
            error: false,
            success: true,
            message : "product Deleted from cart"
        })

    } catch (err) {
        res.status(400).json({
            message:  err?.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = deleteAddToCartProduct