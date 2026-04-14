const friendshipService = require("../services/friendship.service");

class FriendshipController{
    async sendRequest(req,res,next){
        const userId = req.user.userId;
        const response = req.params.id;
        try {
            const result = await friendshipService.sendRequest(userId,response);
            res.status(201).json({message:"Arkadaşlık isteği gönderdildi",result})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new FriendshipController();