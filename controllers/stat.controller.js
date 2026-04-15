const statService = require("../services/stat.service");

class StatController{
    async updateMatchResult(req,res,next){
        const userId = req.user.userId;
        const {result} = req.body;
        try {
            const response = await statService.updateMatchResult(userId,result);
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
    async getLeaderboard(req,res,next){
        const limit = parseInt(req.query.limit, 10);
        try {
            const response = await statService.getTopPlayers(limit)
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new StatController();