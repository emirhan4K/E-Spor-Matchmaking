const Team = require("../models/Team.model");
const BaseRepository = require("./base.repository");

class TeamRepository extends BaseRepository {
    constructor() {
        super(Team);
    }
    async getTeamById(teamId){ //Takım ID'sine göre takım bilgisi getir ve üyeleri de dahil et
        return await this.model.findById(teamId).populate("leader", "username avatar").populate("members", "username elo");
    }
    async addMemberToTeam(teamId,userId){ //Takıma üye ekleme işlemi, aynı üyeyi tekrar eklememek için $addToSet operatörünü kullan
        return await this.model.findByIdAndUpdate(
            teamId,
            { $addToSet: { members: userId } }, //Üyeyi ekle, ancak zaten varsa tekrar ekleme
            { new: true }
        ).populate("members");
    }
}

module.exports = new TeamRepository();