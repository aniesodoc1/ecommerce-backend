const productModel = require("../../models/productModel");

async function deleteProductController(req, res) {
  try {
    const { _id } = req.body;

    if (!_id) {
      throw new Error("Product ID is required");
    }

    const deletedProduct = await productModel.findByIdAndDelete(_id);

    if (!deletedProduct) {
      throw new Error("Product not found or already deleted");
    }

    res.json({
      data: deletedProduct,
      error: false,
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = deleteProductController;
