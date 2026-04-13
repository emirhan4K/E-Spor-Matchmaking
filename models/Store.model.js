const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
    itemName:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    type:{
        type:String,
    },
})

module.exports = mongoose.model("Store",storeSchema);