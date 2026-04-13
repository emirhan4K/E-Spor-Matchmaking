const teamService = require("../services/team.service");

class TeamController{
    async createTeam(req,res,next){
        const userId = req.user.userId;
        const {name} = req.body;
        try {
            const result = await teamService.createTeam(userId,name);
            res.status(201).json(result);
        } catch (error) {
            next(error)
        }   
    }
    async getTeam(req, res, next){
        const id = req.params.id;
        try {
            const result = await teamService.getTeamById(id)
            res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new TeamController();