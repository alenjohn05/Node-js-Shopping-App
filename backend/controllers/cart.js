const Cart = require("../models/Cart");
const ErrorResponse = require("../middleware/error");

//Create Cart
exports.createCart = async (req, res, next) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json({
      success: true,
      savedCart,
    });
  } catch (error) {
    next(error);
  }
};

//UpdateCart
exports.updateCart = async (req, res, next) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      updatedCart,
    });
  } catch (error) {
    next(error);
  }
};

//DELETE
exports.deleteCart = async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Cart has Deleted",
    });
  } catch (error) {
    next(error);
  }
};

//GET USER CART
exports.getUserCart=async (req, res, next) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.status(200).json({
        success: true,
        cart,
      });
    } catch (error) {
      next(err);
    }
  };

  