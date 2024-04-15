const express = require('express');
const router = express.Router();
const { product, products, post } = require('../controller/productController.js');

router.get("/products", products);
router.get("/product", product);
router.post("/post", post);

module.exports = router;
