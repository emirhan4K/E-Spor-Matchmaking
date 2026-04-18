const Store = require("../models/Store.model");
const BaseRepository = require("./base.repository");

class StoreRepository extends BaseRepository {
    constructor() {
        super(Store);
    }
}

module.exports = new StoreRepository();