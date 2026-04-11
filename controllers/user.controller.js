const userService = require("../services/user.service");

class UserController{
     async getProfile(req,res){
    const profile = req.user.userId
    try {
        const result = await authService.getProfile(profile);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
  }
}

module.exports = new UserController();