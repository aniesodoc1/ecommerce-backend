const addToCartModel = require("../../models/cartProduct")

const addToCartController = async (req, res) => {
  try {
    const { productId } = req?.body
    const currentUser = req.userId

    const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser })

    if (isProductAvailable) {
      return res.json({
        error: true,
        success: false,
        message: "Already exists in your cart"
      })
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    }

    const newAddToCart = new addToCartModel(payload)
    const saveProduct = await newAddToCart.save()

    return res.json({
      data: saveProduct,
      error: false,
      success: true,
      message: "Product Added In Cart"
    })

  } catch (err) {
    res.status(400).json({
      message: err?.message || err,
      error: true,
      success: false
    })
  }
}

module.exports = addToCartController
