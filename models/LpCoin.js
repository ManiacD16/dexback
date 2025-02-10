const mongoose = require("mongoose");

const lpCoinSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    sender: { type: String, required: true },
    lpCoinId: { type: String, unique: true, required: true },
    token0Type: {
      name: { type: String, required: true },
    },
    token1Type: {
      name: { type: String, required: true },
    },
    amount0: { type: String, required: true },
    amount1: { type: String, required: true },
    liquidity: { type: String, required: true },
    totalSupply: { type: String, required: true },
    timestamp: { type: String, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Index for faster queries
lpCoinSchema.index({ lpCoinId: 1 });
lpCoinSchema.index({ sender: 1 });
// lpCoinSchema.index({ timestamp: -1 });

module.exports = mongoose.model("LpCoin", lpCoinSchema);
