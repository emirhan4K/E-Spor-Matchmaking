const friendshipRepository = require("../repositories/friendship.repository");
const userRepository = require("../repositories/user.repository");

class FriendshipService{
    async sendRequest(requesterId, recipientId){
        if(requesterId === recipientId){
            throw new Error("Kendinize arkadaşlık isteği gönderemezsiniz.");
        }
        const user = await userRepository(requesterId,recipientId);
        if(!user){
            throw new Error("Kullanıcı bulunamadı!")
        }
        
    }
}