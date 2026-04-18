const User = require("../models/User.model");
const BaseRepository = require("./base.repository");

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
  async findByEmail(email) {  
    return await this.model.findOne({ email });
  }

  async findByIdWithoutPassword(userId) { //Şifreyi hariç tutarak kullanıcıyı bul
    return await this.model.findById(userId).select("-password");
  }

  async getLeaderboard(limit) { //Elo sıralamasına göre lider tablosu getir ve sadece username, elo ve avatar alanlarını seç
    return await this.model.find().sort({ elo: -1 }).limit(limit).select("username elo avatar");
  }

  async deactiveAccount(userId) { //Hesabı pasif hale getirme ve güncelleme işlemi
    return await this.model.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    );
  }
}

module.exports = new UserRepository();