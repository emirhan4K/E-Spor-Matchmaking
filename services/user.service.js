const userRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");

class UserService {
  async getProfile(userId) {
    const userProfile = await userRepository.findById(userId);
    if (!userProfile) {
      throw new Error("Kullanıcı bulunamadı!");
    }
    return userProfile;
  }

  async updateUserProfile(userId, username, bio) {
    const update = await userRepository.updateProfile(userId, {
      username,
      bio,
    });
    return update;
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await userRepository.findByIdWithPassword(userId);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı!");
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error("Eski şifre hatalı!");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await userRepository.updateProfile(userId, {
      password: hashedPassword,
    });
    return updatedUser;
  }
}

module.exports = new UserService();
