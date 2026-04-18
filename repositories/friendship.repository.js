const Friendship = require("../models/Friendship.model"); 
const BaseRepository = require("./base.repository");

class FriendshipRepository extends BaseRepository {
    constructor() {
        super(Friendship);
      }
    async getPendingRequests(userId) { //Bir kullanıcıya gelen beklemedeki arkadaşlık isteklerini getir
        return await this.model.find({ 
            receiver: userId, 
            status: "pending" 
        }).populate("sender", "username avatar");
    }
    async checkExistingFriendship(user1Id, user2Id) { //İki kullanıcı arasında mevcut bir arkadaşlık isteği veya ilişki olup olmadığını kontrol et
        return await this.model.findOne({
            $or: [
                { sender: user1Id, receiver: user2Id }, // user1, user2'ye yollamış
                { sender: user2Id, receiver: user1Id }  // user2, user1'e yollamış
            ]
        });
    }
}

module.exports = new FriendshipRepository();