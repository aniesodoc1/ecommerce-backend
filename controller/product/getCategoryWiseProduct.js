const productModel = require("../../models/productModel")
const getCategoryWiseProduct = async(req, res)=> {
    try {
        const { category } = req?.body;

        const product = await productModel.find({
                category
        }).sort({ createdAt: -1 });

        res.json({
            data : product,
            error: false,
            success: true,
            message : "product"
        });
    } catch (err) {
        res.status(400).json({
            message:  err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = getCategoryWiseProduct