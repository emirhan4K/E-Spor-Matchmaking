const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    coins: {
      type: Number,
      default: 0,
    },
    ownedItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Wallet",walletSchema);
