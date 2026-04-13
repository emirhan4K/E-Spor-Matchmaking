class OnlineService {
  constructor() {
    this.onlineUsers = [];
  }

  loginUser(userId) {
    if (!this.onlineUsers.includes(userId)) {
      this.onlineUsers.push(userId);
    }
  }

  logoutUser(userId) {
    this.onlineUsers = this.onlineUsers.filter((id) => id !== userId);
  }

  getOnlineUsers() {
    return this.onlineUsers;
  }
}

module.exports = new OnlineService();
