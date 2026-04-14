const Store = require("../models/Store.model");

class StoreRepository{
    async getItemById(itemId){
        const get = await Store.findOne(itemId);
        return get;
    }
}

module.exports = new StoreRepository();