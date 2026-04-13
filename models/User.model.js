const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  elo: {
    type: Number,
    default: 1000,
  },
  wins: {
    type: Number,
    default: 0,
  },
  losses: {
    type: Number,
    default: 0,
  },
  winRate:{
    type:Number,
    default: 0
  },
  bio:{
    type:String,
    default:"Ben bir E-Sporcuyum!",
    maxLength: 150,
    trim:true
  },
  team:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Team",
    default:null
  },
  avatar:{
    type:String,
    default:"default_avatar.png",
  },
  wallet:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Wallet"
  },
  level:{
    type:Number,
    default:1
  },
  xp:{
    type:Number,
    default:0
  },
  isActive:{
    type:Boolean,
    default:true
  }
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);
