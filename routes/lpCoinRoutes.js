const express = require("express");
const router = express.Router();
const {
  createLpCoin,
  getLpHistoryBySender,
  getLpHistoryByTokens,
} = require("../controllers/lpCoinController");

// Define routes
router.post("/lpcoin", createLpCoin);
router.get("/lpcoin/:sender", getLpHistoryBySender);
router.get("/lpcoin/history", getLpHistoryByTokens);

module.exports = router;
