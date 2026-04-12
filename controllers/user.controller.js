const userService = require("../services/user.service");

class UserController {
  async getProfile(req, res) {
    const profile = req.user.userId;
    try {
      const result = await userService.getProfile(profile);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateProfile(req, res) {
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
      res.status(400).json({ message: error.message });
    }
  }

  async changePassword(req, res) {
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
      res.status(400).json({ message: error.message });
    }
  }

  async deleteAccount(req, res) {
    const userId = req.user.userId;
    try {
      const result = await userService.deleteAccount(userId);
      res.status(200).json({ message: "Hesabınız başarıyla silindi!" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateAvatar(req,res){
    const userId = req.user.userId;
    if(!req.file){
      return res.status(400).json({message: "Lütfen bir resim dosyası yükleyin!"})
    }
    try {
      const result = await userService.updateAvatar(userId,req.file.filename);
      res.status(200).json({message:"Avatar başarıyla güncellendi",result})
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

}

module.exports = new UserController();
