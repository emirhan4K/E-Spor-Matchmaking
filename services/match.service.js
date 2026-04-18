const matchRepository = require("../repositories/match.repository");
const userRepository = require("../repositories/user.repository");
const walletRepository = require("../repositories/wallet.repository");

class MatchService {
  async createMatch(playerA, playerB, winner, score, eloChange) {
    const createdMatch = await matchRepository.create({
      playerA,
      playerB,
      winner,
      score,
      eloChange,
    });
    if (eloChange) {
      const loser =
        winner.toString() === playerA.toString() ? playerB : playerA; //Kazanan player A mı değilse playerB değilse playerA
      // Kazananın Elo'sunu artır
      await userRepository.update(winner, {
        $inc: { elo: eloChange },
      });
      await walletRepository.addCoins(winner,50) //Kazananın cüzdanına 50 coin 
      // Kaybedenin Elo'sunu düşür
      await userRepository.update(loser, {
        $inc: { elo: -eloChange },
      });
    }
    return createdMatch;
  }

  async getUserMatches(userId) {
    const userMatch = await matchRepository.getMatchesByUserId(userId);
    return userMatch;
  }
}

module.exports = new MatchService();
