const express = require("express");
const router = express.Router();
const {
  createLpCoin,
  getLpHistoryBySender,
  getLpHistoryByPair,
} = require("../controllers/lpCoinController");

// Define routes
router.post("/lpcoin", createLpCoin);
router.get("/lpcoin/:sender", getLpHistoryBySender); // Changed path
router.get("/lpcoin/pair/:pairId", getLpHistoryByPair); // Changed path

module.exports = router;
