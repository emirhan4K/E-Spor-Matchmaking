const teamRepository = require("../repositories/team.repository");
const userRepository = require("../repositories/user.repository");

class TeamService {
  async createTeam(userId, teamName) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı!");
    }
    if (user.team) {
      throw new Error("Zaten bir takımdasın!");
    }
    const newTeam = await teamRepository.createTeam({
      name: teamName,
      leader: userId,
      members: [userId],
    });
    await userRepository.updateProfile(userId,{
        team:newTeam.id
    })
    return newTeam;
  }
  async getTeamById(teamId) {
    const getAll = await teamRepository.getTeamById(teamId);
    if (!getAll) {
      throw new Error("Takım bulunamadı!");
    }
    return getAll;
  }
}

module.exports = new TeamService();
