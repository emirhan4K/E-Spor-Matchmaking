const userService = require("../services/user.service");
const onlineService = require("../services/online.service");
const BadRequestException = require("../exceptions/BadRequestException");

class UserController {
  async getProfile(req, res, next) {
    const profile = req.user.userId;
    try {
      const result = await userService.getProfile(profile);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    const profile = req.user.userId;
    const { username, bio } = req.body;
    try {
      const result = await userService.updateUserProfile(
        profile,
        username,
        bio,
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req, res, next) {
    const userId = req.user.userId;
    const { oldPassword, newPassword } = req.body;
    try {
      const result = await userService.changePassword(
        userId,
        oldPassword,
        newPassword,
      );
      res.status(200).json({ message: "Şifre başarıyla güncellendi!", result });
    } catch (error) {
      next(error);
    }
  }

  async deleteAccount(req, res, next) {
    const userId = req.user.userId;
    try {
      await userService.deleteAccount(userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async updateAvatar(req, res, next) { 
    const userId = req.user.userId;
    try {
      if (!req.file) {
        throw new BadRequestException("Lütfen bir resim dosyası yükleyin!");
      }
      const result = await userService.updateAvatar(userId, req.file.filename);
      res.status(200).json({ message: "Avatar başarıyla güncellendi", result });
    } catch (error) {
      next(error);
    }
  }
  async getOnlineUsers(req, res, next) {
    try {
      const activeUsers = onlineService.getOnlineUsers();
      res.status(200).json({ count: activeUsers.length, users: activeUsers });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
