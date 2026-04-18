const User = require("../models/User.model");
const BaseRepository = require("./base.repository");

class UserRepository {
  async findByEmail(email) {  
    const user = await User.findOne({ email });
    return user;
  }

  async createUser(userData) {
    const create = await User.create(userData);
    return create;
  }

  async findById(userId) {
    const user = await User.findById(userId).select("-password");
    return user;
  }

  async updateProfile(userId, updateData) {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");
    return user;
  }

  async findByIdWithPassword(userId) {
    const user = await User.findById(userId);
    return user;
  }

  async deactiveAccount(userId) {
    const user = await User.findByIdAndDelete(
      userId,
      { isActive: false },
      { new: true },
    );
    return user;
  }

  async getLeaderboard(limit){
    const user = await User.find().sort({elo: -1}).limit(limit).select("username elo avatar")
    return user;
  }
}

module.exports = new UserRepository();
