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
}

module.exports = new TeamRepository();