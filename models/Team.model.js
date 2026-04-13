const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    logo: {
      type: String,
      default: "default-team.png",
    },
    totalElo: {
      type: Number,
      default: 1000,
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Team", teamSchema);
