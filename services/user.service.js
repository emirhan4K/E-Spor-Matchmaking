const BadRequestException = require("../exceptions/BadRequestException");
const NotFoundException = require("../exceptions/NotFoundException");
const userRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");

class UserService {
  async getProfile(userId) {
    const userProfile = await userRepository.findById(userId);
    if (!userProfile) {
      throw new NotFoundException("Kullanıcı bulunamadı!");
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
      throw new NotFoundException("Kullanıcı bulunamadı!");
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException("Eski şifre hatalı!");
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const updatedUser = await userRepository.updateProfile(userId, {
      password: hashedPassword,
    });
    return updatedUser;
  }

  async deleteAccount(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException("Kullanıcı bulunamadı!");
    }
    const deactivatedUser = await userRepository.deactiveAccount(userId);
    return deactivatedUser;
  }

  async updateAvatar(userId, filename) {
    const updatedUser = await userRepository.updateProfile(userId, {
      avatar: filename,
    });
    return updatedUser;
  }
}

module.exports = new UserService();
