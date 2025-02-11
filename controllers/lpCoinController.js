// controllers/lpCoinController.js
const LpCoin = require("../models/LpCoin");

exports.createLpCoin = async (req, res) => {
  try {
    const events = Array.isArray(req.body) ? req.body : [req.body];

    const results = {
      successful: [],
      failed: [],
    };

    for (const event of events) {
      try {
        // Check for existing record
        const existing = await LpCoin.findOne({ lpCoinId: event.lpCoinId });
        if (existing) {
          results.failed.push({
            lpCoinId: event.lpCoinId,
            reason: "LP Coin already exists",
          });
          continue;
        }

        // Create new LP coin record
        const newLpCoin = new LpCoin({
          type: event.type,
          sender: event.sender,
          lpCoinId: event.lpCoinId,
          token0Type: {
            name: event.token0Type.name,
          },
          token1Type: {
            name: event.token1Type.name,
          },
          amount0: event.amount0,
          amount1: event.amount1,
          liquidity: event.liquidity,
          totalSupply: event.totalSupply,
          pairId: event.pairId,
          transactionHash: event.transactionHash,
          timestamp: event.timestamp || new Date().toISOString(),
        });

        await newLpCoin.save();
        results.successful.push(newLpCoin);
      } catch (error) {
        results.failed.push({
          lpCoinId: event.lpCoinId,
          reason: error.message,
        });
      }
    }

    // Return appropriate response
    if (results.successful.length > 0) {
      res.status(201).json({
        message: `Successfully processed ${results.successful.length} LP events`,
        data: {
          successful: results.successful,
          failed: results.failed,
        },
      });
    } else {
      res.status(400).json({
        message: "Failed to process any LP events",
        errors: results.failed,
      });
    }
  } catch (error) {
    console.error("Error in createLpCoin:", error);
    res.status(500).json({
      message: "Server error while processing LP events",
      error: error.message,
    });
  }
};

// exports.getLpCoinById = async (req, res) => {
//   try {
//     const { lpCoinId } = req.params;
//     const lpCoin = await LpCoin.findOne({ lpCoinId });

//     if (!lpCoin) {
//       return res.status(404).json({
//         message: "LP Coin not found",
//         lpCoinId,
//       });
//     }

//     res.status(200).json({
//       message: "LP Coin found successfully",
//       data: lpCoin,
//     });
//   } catch (error) {
//     console.error("Error in getLpCoinById:", error);
//     res.status(500).json({
//       message: "Server error while fetching LP Coin",
//       error: error.message,
//     });
//   }
// };

// Fetch liquidity history for a specific sender
exports.getLpHistoryBySender = async (req, res) => {
  try {
    const { sender } = req.params;
    const history = await LpCoin.find({ sender }).sort({ timestamp: -1 });

    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching LP history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getRecentLpCoins = async (req, res) => {
  try {
    const { limit = 10, skip = 0, sender } = req.query;

    const query = {};
    if (sender) query.sender = sender;

    const lpCoins = await LpCoin.find(query)
      .sort({ timestamp: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await LpCoin.countDocuments(query);

    res.status(200).json({
      message: "LP Coins retrieved successfully",
      data: lpCoins,
      pagination: {
        total,
        skip: Number(skip),
        limit: Number(limit),
        hasMore: total > Number(skip) + Number(limit),
      },
    });
  } catch (error) {
    console.error("Error in getRecentLpCoins:", error);
    res.status(500).json({
      message: "Server error while fetching recent LP Coins",
      error: error.message,
    });
  }
};
