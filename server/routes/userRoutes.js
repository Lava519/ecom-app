const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/middleware.js');
const { login, register, authenticate, image, getUserID } = require('../controller/userController.js');

router.post("/login", login)
router.post("/register", register)
router.get("/authenticate", authenticateToken, authenticate);
router.get("/getUserID", authenticateToken, getUserID);
router.post("/avatar", authenticateToken, image);

module.exports = router;
