const productModel = require("../../models/productModel");

const getProductDetails = async (req,res) => {
    try {
        const { productId } = req.body

        const product = await productModel.findById(productId)

        res.json({
            data : product,
            error: false,
            success: true,
            message : "Ok"
        })
    } catch (err) {
        res.status(400).json({
            message:  err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = getProductDetails