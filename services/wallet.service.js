const walletRepository = require("../repositories/wallet.repository");
const storeRepository = require("../repositories/store.repository");
const userRepository = require("../repositories/user.repository");
const NotFoundException = require("../exceptions/NotFoundException");
const BadRequestException = require("../exceptions/BadRequestException");

class WalletService {
  async buyItem(userId, itemId) {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new NotFoundException("Kullanıcı bulunamadı!");
    }
    const item = await storeRepository.getById(itemId);
    if (!item) {
      throw new NotFoundException("Eşya bulunamadı");
    }
    const wallet = await walletRepository.getWalletByUserId(userId);
    if (!wallet) {
      throw new NotFoundException("Cüzdan bulunamadı");
    }
    if (wallet.coins < item.price) {
      throw new BadRequestException("Yetersiz bakiye!");
    }
    if (wallet.ownedItems.includes(itemId)) {
      throw new BadRequestException("Bu eşyaya zaten sahipsin!");
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
