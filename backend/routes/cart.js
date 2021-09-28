const express = require("express");
const router = express.Router();
const { createCart, updateCart ,deleteCart ,getUserCart } = require("../controllers/cart");
const { protect } = require("../middleware/auth");

router.route('/').post( createCart)
router.route('/:id').put( updateCart)
router.route('/:id').delete( deleteCart)
router.route('/find/:userId').get(getUserCart)

module.exports = router;
