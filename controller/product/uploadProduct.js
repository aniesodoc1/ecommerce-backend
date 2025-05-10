const uploadProductPermission = require("../../helper/permission")
const productModel = require("../../models/productModel")

async function UploadProductController(req,res) {
    try {
        const sessionUserId = req.userId

        if(!uploadProductPermission(sessionUserId)){
            throw new Error("permission denied")
        }
        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            data : saveProduct,
            error: false,
            success: true,
            message : "product upload successfully"
        })
    } catch (err) {
        res.status(400).json({
            message:  err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = UploadProductController