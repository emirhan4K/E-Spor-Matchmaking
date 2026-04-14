const Friendship = require("../models/Friendship.model");

class FriendshipRepository {
  async checkExistingRequest(userA, userB) {  //Daha önce istek atılmış mı ?
    const control = await Friendship.findOne({
      $or: [
        { requester: userA, recipient: userB }, //A Kişisi B kişisine istek atmış mı ?
        { requester: userB, recipient: userA }, //B Kişisi A kişisine istek atmış mı ?
      ],
    });
    return control;
  }
  async createRequest(requesterId, recipientId) {
    const newRequest = await Friendship.create({
      requester: requesterId,
      recipient: recipientId,
      status: "pending", // Bekliyor
    });
    return newRequest;
  }
  async getRequestById(requestId){ //Gelen arkadaşlık isteğini bul
    const find = await Friendship.findById(requestId);
    return find;
  }
  async updateRequestStatus(requestId, newStatus){ //Gelen isteğin durumunu güncelle
    const updated = await Friendship.findByIdAndUpdate(requestId,
        {status:newStatus},
        {new: true}, // güncellenmiş veriyi döndür
    );
    return updated;
  }
  async getPendingRequests(userId){ //Gelen İstekleri Listeleme
    const requests = await Friendship.find({recipient:userId,status:"pending"}).populate("requester","username avatar");
    return requests;
  }
   async getFriends(userId) { //Arkadaş Listesi
    const friends = await Friendship.find({ $or: [{ requester: userId }, { recipient: userId }], status: "accepted" }).populate("requester recipient", "username avatar")
    return friends;
   }
   
}
module.exports = new FriendshipRepository();
