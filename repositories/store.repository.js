const Store = require("../models/Store.model");

class StoreRepository{
    async getItemById(itemId){
        const item = await Store.findById(itemId);
        return item;
    }
}

module.exports = new StoreRepository();