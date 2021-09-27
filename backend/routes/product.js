const express = require("express");
const router = express.Router();
const { getProducts, getProductById } = require("../controllers/product");


router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

module.exports = router;
