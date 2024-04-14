const express = require('express');
const router = express.Router();
const { product, products } = require('../controller/productController.js');

router.get("/products", products);
router.get("/product", product);

module.exports = router;
