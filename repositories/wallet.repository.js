const Wallet = require("../models/Wallet.model");

class WalletRepository{
   async createWallet(userId){
        const create = await Wallet.create({owner:userId});
        return create;
    }
    async getWalletByUserId(userId){
        const search = await Wallet.findOne(userId).populate("ownedItems");
        return search;
    }
    async addCoins(userId, amount){
        const coin = await Wallet.findByIdAndUpdate({ owner: userId }, { $inc: { coins: amount } }, { new: true });
        return coin;
    }
}

module.exports = new WalletRepository();