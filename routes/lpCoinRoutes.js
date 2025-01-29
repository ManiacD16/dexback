const express = require("express");
const router = express.Router();
const { createLpCoin, getLpCoinById } = require("../controllers/lpCoinController");

// Define routes
router.post("/lpcoin", createLpCoin);
router.get("/lpcoin/:lpCoinId", getLpCoinById);

module.exports = router; 