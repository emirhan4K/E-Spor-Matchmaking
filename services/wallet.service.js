const walletRepository = require("../repositories/wallet.repository");
const storeRepository = require("../repositories/store.repository");
const userRepository = require("../repositories/user.repository");

class WalletService {
  async buyItem(userId, itemId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı!");
    }
    const item = await storeRepository.getItemById(itemId);
    if (!item) {
      throw new Error("Eşya bulunamadı");
    }
    const wallet = await walletRepository.getWalletByUserId(userId);
    if (!wallet) {
      throw new Error("Cüzdan bulunamadı");
    }
    if (wallet.coins < item.price) {
      throw new Error("Yetersiz bakiye!");
    }
    if (wallet.ownedItems.includes(itemId)) {
      throw new Error("Bu eşyaya zaten sahipsin!");
    }
    wallet.coins -= item.price; //Parayı düş
    wallet.ownedItems.push(itemId); //Eşyayı envantere ekle
    await wallet.save();
    return {
      message: "Satın alma başarılı!",
      coins: wallet.coins,
      item: item,
    };
  }
}
module.exports = new WalletService();
