const userRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthSerice {
  async register(username, email, password) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Bu email zaten kayitli!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userRepository.createUser({
      username,
      email,
      password: hashedPassword,
    });
    return { message: "Kullanıcı başarıyla oluşturuldu!", user: newUser };
  }

  async login(email, password) {
    const existingUser = await userRepository.findByEmail(email);
    if (!existingUser) {
      throw new Error("Hatalı e-posta");
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      throw new Error("Geçersiz sifre");
    }
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    return { message: "Giriş başarılı.", token };
  }

}

module.exports = new AuthSerice();
