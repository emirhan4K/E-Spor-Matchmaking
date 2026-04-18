const Wallet = require("../models/Wallet.model");
const BaseRepository = require("./base.repository");

class WalletRepository extends BaseRepository {
    constructor() {
        super(Wallet);
    }
    async getWalletByUserId(userId){ // Kullanıcı ID'sine göre cüzdan bilgisi getir
        return await this.model.findOne({ owner: userId }).populate("owner", "username");
    }
    async addCoins(userId, amount){ // Kullanıcı cüzdanına coin ekleme işlemi, $inc operatörünü kullanarak mevcut coin miktarını artır
        return await this.model.findOneAndUpdate(
            { owner: userId },
            { $inc: { coins: amount } }, // Belirtilen miktarda coin ekle
            { new: true } // Güncellenmiş belgeyi döndür
        ).populate("owner", "username");
    }
}

module.exports = new WalletRepository();