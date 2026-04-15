const userRepository = require("../repositories/user.repository");
const walletRepository = require("../repositories/wallet.repository");
const onlineService = require("./online.service");
const BadRequestException = require("../exceptions/BadRequestException");
const NotFoundException = require("../exceptions/NotFoundException");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {
  async register(username, email, password) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException("Bu email zaten kayıtlı!");
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt);
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
      throw new BadRequestException("Hatalı e-posta");
    }

    if(existingUser.isActive === false){
      throw new NotFoundException("Bu hesap silinmiştir. Lütfen destek ekibiyle iletişime geçin.");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException("Geçersiz sifre");
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

module.exports = new AuthService();
