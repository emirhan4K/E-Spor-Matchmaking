const userRepository = require("../repositories/user.repository");

class UserService{
async getProfile(userId) {
    const userProfile = await userRepository.findById(userId);
    if (!userProfile) {
      throw new Error("Kullanıcı bulunamadı!");
    }
    return userProfile;
  }

  async updateUserProfile(userId,username,bio){
    const update = await userRepository.updateProfile(userId,{username,bio})
    return update;
  }
}

module.exports = new UserService();