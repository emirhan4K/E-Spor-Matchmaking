const authService = require("../services/auth.service");

class AuthController {
  async register(req, res) {
    const { username, email, password } = req.body;
    try {
      const userRegister = await authService.register(
        username,
        email,
        password,
      );
      res.status(201).json(userRegister);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const userLogin = await authService.login(email, password);
      res.status(200).json(userLogin);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

 

}

module.exports = new AuthController();
