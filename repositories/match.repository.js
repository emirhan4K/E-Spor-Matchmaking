const Match = require("../models/Match.model");

class MatchRepository{
    async createMatch(matchData){
        const state = await Match.create(matchData);
        return state;
    }
    async getMatchesByUserId(userId){
        const match = await Match.find({ $or: [{playerA: userId}, {playerB: userId}] }).sort({createdAt: -1});
        return match;
    }
}

module.exports = new MatchRepository();