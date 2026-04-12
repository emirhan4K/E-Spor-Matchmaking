const userRepository = require("../repositories/user.repository");

class StatService{
   async updateMatchResult(userId, result){
    const user = await userRepository.findById(userId);
    if(!user){
        throw new Error("Kullanıcı bulunamadı")
    }
   }
}