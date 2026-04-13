const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    playerA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    playerB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    score: {
      type: String,
    },
    eloChange: {
      type: Number,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Match", matchSchema);
