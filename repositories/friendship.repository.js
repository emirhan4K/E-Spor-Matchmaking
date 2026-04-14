const Friendship = require("../models/Friendship.model");

class FriendshipRepository {
  async checkExistingRequest(userA, userB) {
    //Daha önce istek atılmış mı ?
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
}
module.exports = new FriendshipRepository();
