const friendshipRepository = require("../repositories/friendship.repository");
const userRepository = require("../repositories/user.repository");

class FriendshipService{
    async sendRequest(requesterId, recipientId){
        if(requesterId === recipientId){
            throw new Error("Kendinize arkadaşlık isteği gönderemezsiniz.");
        }
        const user = await userRepository.findById(recipientId); //İstek atılan kullanıcı var mı ?
        if(!user){
            throw new Error("Kullanıcı bulunamadı!")
        }
        const control = await friendshipRepository.checkExistingRequest(requesterId,recipientId)
        if(control){
            throw new Error("Zaten bir istek var veya arkadaşsınız");
        }
        const saved = await friendshipRepository.createRequest(requesterId,recipientId);
        return saved;
    }
}
module.exports = new FriendshipService();