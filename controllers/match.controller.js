const matchService = require("../services/match.service");

class MatchController {
  async createMatch(req, res, next) {
    const { playerA, playerB, winner, score, eloChange } = req.body;
    try {
      const result = await matchService.createMatch(
        playerA,
        playerB,
        winner,
        score,
        eloChange,
      );
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
  async getMyMatches(req, res, next) {
    const userId = req.user.userId;
    try {
      const result = await matchService.getUserMatches(userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MatchController();
