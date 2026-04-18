const BadRequestException = require("../exceptions/BadRequestException");
const NotFoundException = require("../exceptions/NotFoundException");
const teamRepository = require("../repositories/team.repository");
const userRepository = require("../repositories/user.repository");

class TeamService {
  async createTeam(userId, teamName) {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new NotFoundException("Kullanıcı bulunamadı!");
    }
    if (user.team) {
      throw new BadRequestException("Zaten bir takımdasın!");
    }
    const newTeam = await teamRepository.create({
      name: teamName,
      leader: userId,
      members: [userId],
    });
    await userRepository.update(userId, {
      team: newTeam._id, 
    });
    
    return newTeam;
  }

  async getTeamById(teamId) {
    const team = await teamRepository.getTeamById(teamId);
    if (!team) {
      throw new NotFoundException("Takım bulunamadı!");
    }
    return team;
  }

  async joinTeam(membersId, teamId) {
    const user = await userRepository.getById(membersId);
    if (!user) {
      throw new NotFoundException("Kullanıcı bulunamadı!");
    }
    if (user.team) {
      throw new BadRequestException("Zaten bir takımdasın!");
    }
    const team = await teamRepository.getTeamById(teamId);
    if (!team) {
      throw new NotFoundException("Takım bulunamadı!");
    }
    await teamRepository.addMemberToTeam(teamId, membersId);
    const updatedUser = await userRepository.update(membersId, {
      team: teamId,
    });
    
    return { updatedUser, team };
  }
}

module.exports = new TeamService();