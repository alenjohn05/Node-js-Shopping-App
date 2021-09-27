const Product = require("../models/Product");
const ErrorResponse = require("../middleware/error");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(new ErrorResponse("Product not found", 404));
  }
};

