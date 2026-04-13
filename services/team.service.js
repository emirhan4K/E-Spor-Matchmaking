const teamRepository = require("../repositories/team.repository");
const userRepository = require("../repositories/user.repository");

class TeamService{
    async createTeam(teamId,name){
        const team = await userRepository.findById(teamId);
        if(team || team !== null){
            throw new Error("Zaten bir takımdasın")
        }
    }
}