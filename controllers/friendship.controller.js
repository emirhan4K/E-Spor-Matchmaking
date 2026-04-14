const friendshipService = require("../services/friendship.service");

class FriendshipController{
    async sendRequest(req,res,next){
        const userId = req.user.userId;
        const recipientId = req.params.id;
        try {
            const result = await friendshipService.sendRequest(userId,recipientId);
            res.status(201).json({message:"Arkadaşlık isteği gönderdildi",result})
        } catch (error) {
            next(error)
        }
    }
    async acceptRequest(req,res,next){
        const userId = req.user.userId;
        const requestId = req.params.id;
        try {
            const result = friendshipService.acceptRequest(userId,requestId);
            res.status(200).json({message:"İstek kabul edildi",result})
        } catch (error) {
            next(error)
        }
    }
    async rejectRequest(req,res,next){
        const userId = req.user.userId;
        const requestId = req.params.id;
        try {
            const result = friendshipService.rejectRequest(userId,requestId);
            res.status(200).json({message:"İstek reddedildi",result})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new FriendshipController();