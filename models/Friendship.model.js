const mongoose = require("mongoose")

const friendshipSchema = mongoose.Schema({
    requester:{ //İsteği atan
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    recipient:{ //İsteği alan 
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected"], //kabul edildi - reddedildi
        default:"pending", //bekliyor
    },
},{timestamps:true});

module.exports = mongoose.model("Friendship",friendshipSchema);