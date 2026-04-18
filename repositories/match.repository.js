const Match = require("../models/Match.model");
const BaseRepository = require("./base.repository");

class MatchRepository extends BaseRepository {
    constructor() {
        super(Match);
    }
    async getMatchesByUserId(userId){ //Kullanıcı ID'sine göre maçları getir, hem takım A hem de takım B içinde kullanıcıyı kontrol et
        return await this.model.find({ $or: [ { teamA: userId }, { teamB: userId } ] }).populate("teamA").populate("teamB").populate("winner");
    }
}

module.exports = new MatchRepository();