const productModel = require("../../models/productModel")

const filterProductController = async (req,res) => {
    try {
        const categoryList = req?.body?.category || []

        const product = await productModel.find({
            category : {
                "$in" : categoryList
            }
        })

        res.status(200).json({
            data : product,
            error: false,
            success: true,
            message : "product"
        })
    } catch (error) {
        res.status(400).json({
            message:  err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = filterProductController