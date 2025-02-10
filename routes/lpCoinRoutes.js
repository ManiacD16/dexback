const express = require("express");
const router = express.Router();
const {
  createLpCoin,
  getLpHistoryBySender,
} = require("../controllers/lpCoinController");

// Define routes
router.post("/lpcoin", createLpCoin);
router.get("/lpcoin/:sender", getLpHistoryBySender);

module.exports = router;
