const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middleware/middleware.js');
const { cart, cartItems, deleteCart } = require("../controller/cartController.js");

router.get("/cartItems", authenticateToken, cartItems);
router.post("/cart", authenticateToken, cart);
router.post("/deleteCart", authenticateToken, deleteCart);

module.exports = router;
