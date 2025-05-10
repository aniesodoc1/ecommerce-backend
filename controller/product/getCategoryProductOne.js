const productModel = require("../../models/productModel")

const getCategoryProduct = async (req,res) => {
    try {
        const productCategory = await productModel.distinct("category")

        console.log(productCategory)

        const productByCategory = []

        for (const category of productCategory){
            const product = await productModel.findOne({category}).sort({ createdAt: -1 });

            if(product){
                productByCategory.push(product)
            }
        }

        res.status(200).json({
            data : productByCategory,
            error: false,
            success: true,
            message : "product category"
        })
    } catch (err) {
        res.status(400).json({
            message:  err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = getCategoryProduct