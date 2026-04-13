const matchRepository = require("../repositories/match.repository");
const userRepository = require("../repositories/user.repository");

class MatchService {
  async createMatch(playerA, playerB, winner, score, eloChange) {
    const createdMatch = await matchRepository.createMatch({
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
      await userRepository.updateProfile(winner, {
        $inc: { elo: eloChange },
      });
      // Kaybedenin Elo'sunu düşür
      await userRepository.updateProfile(loser, {
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
