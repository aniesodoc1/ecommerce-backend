const productModel = require("../../models/productModel")

const getProductController = async (req,res) => {
    try {
        const allProduct = await productModel.find().sort({ createdAt : -1 })

        res.status(201).json({
            data : allProduct,
            error: false,
            success: true,
            message : "All product"
        })
    } catch (err) {
        res.status(400).json({
            message:  err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = getProductController