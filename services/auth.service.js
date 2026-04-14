const userRepository = require("../repositories/user.repository");
const walletRepository = require("../repositories/wallet.repository");
const onlineService = require("./online.service");
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

    const newWallet = await walletRepository.createWallet(newUser._id);
    await userRepository.updateProfile(newUser._id,{
      wallet:newWallet.id,
    });

    return { message: "Kullanıcı başarıyla oluşturuldu!", user:{
      ...newUser._doc,
      wallet:newWallet._id,
    }};
  }

  async login(email, password) {
    const existingUser = await userRepository.findByEmail(email);
    if (!existingUser) {
      throw new Error("Hatalı e-posta");
    }

    if(existingUser.isActive === false){
      throw new Error("Bu hesap silinmiştir. Lütfen destek ekibiyle iletişime geçin.");
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
    onlineService.loginUser(existingUser._id.toString());
    return { message: "Giriş başarılı.", token };
  }

}

module.exports = new AuthSerice();
