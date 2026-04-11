const userRepository = require("../repositories/user.repository");


class UserService{
async getProfile(userId) {
    const userProfile = await userRepository.findById(userId);
    if (!userProfile) {
      throw new Error("Kullanıcı bulunamadı!");
    }
    return userProfile;
  }
}

module.exports = new UserService();