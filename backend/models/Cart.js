
const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    products: [
      {
        productid: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;