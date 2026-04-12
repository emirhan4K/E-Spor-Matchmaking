const userRepository = require("../repositories/user.repository");

class StatService {
  async updateMatchResult(userId, result) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }
    if (result === "win") {
      user.wins += 1;
      user.xp += 50;
    } else if (result === "loss") {
      user.losses += 1;
      user.xp += 10;
    }

    const totalMatches = user.wins + user.losses;
    user.winRate = Math.round((user.wins /totalMatches)*100)

    if(user.xp >= 100){
        user.level +=1;
        user.xp -=100;
    }
    const updatedStats = await userRepository.updateProfile(userId,{
        wins:user.wins,
        losses:user.losses,
        winRate:user.winRate,
        level:user.level,
        xp:user.xp
    });
    return updatedStats;
  }
}

module.exports = new StatService();
