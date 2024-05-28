const express = require('express');
const router = express.Router();
const { product, products, upload } = require('../controller/productController.js');

router.get("/products", products);
router.get("/product", product);
router.post("/upload", upload);

module.exports = router;
