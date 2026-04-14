const friendshipRepository = require("../repositories/friendship.repository");
const userRepository = require("../repositories/user.repository");

class FriendshipService{
    async sendRequest(requesterId, recipientId){ //İstek gönderme
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
    async acceptRequest(userId, requestId){ //İsteği Kabul Etme
        const request = await friendshipRepository.getRequestById(requestId);
        if(!request){
            throw new Error("Arkadaşlık isteği bulunamadı!");
        }
        if(request.recipient.toString() !== userId.toString()){
            throw new Error("Bu isteği cevaplama yetkiniz yok!");
        }
        if(request.status !== "pending"){
            throw new Error("Bu istek zaten cevaplanmış!")
        }
        const updateRequest = await friendshipRepository.updateRequestStatus(requestId,"accepted")
        return updateRequest;
    }
    async rejectRequest(userId, requestId){ //İsteği Reddetme
        const request = await friendshipRepository.getRequestById(requestId);
        if(!request){
            throw new Error("Arkadaşlık isteği bulunamadı!");
        }
        if(request.recipient.toString() !== userId.toString()){
            throw new Error("Bu isteği cevaplama yetkiniz yok!");
        }
        if(request.status !== "pending"){
            throw new Error("Bu istek zaten cevaplanmış!")
        }
         const updateRequest = await friendshipRepository.updateRequestStatus(requestId,"rejected")
        return updateRequest;
    }
    async getPendingRequests(userId){ //Gelen İstekleri Listeleme
     const requests = await friendshipRepository.getPendingRequests(userId);
     return requests;
    }
    async getFriends(userId){ //Arkadaş Listesi
        const friends = await friendshipRepository.getFriends(userId);
        return friends;
    }
}
module.exports = new FriendshipService();