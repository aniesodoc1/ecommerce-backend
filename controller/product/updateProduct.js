const uploadProductPermission = require("../../helper/permission")
const productModel = require("../../models/productModel")

async function updateProductController(req, res) {
    try {
        if(!uploadProductPermission(req.userId)){
            throw new Error("permission denied")
        }

        const { _id, ...resBody } = req.body
        const updateProduct = await productModel.findByIdAndUpdate(_id,resBody)

        res.json({
            data : updateProduct,
            error: false,
            success: true,
            message : "product update successfully"
        })
    } catch (err) {
        res.status(400).json({
            message:  err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = updateProductController