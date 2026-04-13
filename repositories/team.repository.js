const Team = require("../models/Team.model");

class TeamRepository{
    async createTeam(teamData){
        const save = await Team.create(teamData);
        return save;
    }
    async getTeamById(teamId){
        const teams = await Team.findById(teamId).populate("leader","username avatar").populate("members", "username elo");
        return teams;
    }
    async addMemberToTeam(teamId,userId){
        const teams = await Team.findByIdAndUpdate(teamId,{
            $push:{members: userId}
        },{new: true})
        return teams
    }
}

module.exports = new TeamRepository();