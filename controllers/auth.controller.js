const authService = require("../services/auth.service");
const onlineService = require("../services/online.service");

class AuthController {
  async register(req, res,next) {
    const { username, email, password } = req.body;
    try {
      const userRegister = await authService.register(
        username,
        email,
        password,
      );
      res.status(201).json(userRegister);
    } catch (error) {
      next(error)
    }
  }

  async login(req, res,next) {
    const { email, password } = req.body;
    try {
      const userLogin = await authService.login(email, password);
      res.status(200).json(userLogin);
    } catch (error) {
      next(error)
    }
  }

}

module.exports = new AuthController();
