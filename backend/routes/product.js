const express = require("express");
const router = express.Router();
const { getProducts, getProductById } = require("../controllers/product");
const { protect } = require("../middleware/auth");

router.route('/').get(protect, getProducts)
router.route('/:id').get(protect, getProductById)

module.exports = router;
