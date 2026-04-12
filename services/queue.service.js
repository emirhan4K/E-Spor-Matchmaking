class QueueService {
  constructor() {
    this.waitingPlayers = []; 
  }

  joinQueue(player) {
    if(!player){
        throw new Error("Oyuncu bulunamadı!")
    }
    const players = this.waitingPlayers.find((p)=> p.socketId)
    if(!player){
        this.waitingPlayers.push(players)
    }
  }

  leaveQueue(socketId) {
   
  }

  checkMatch() {

  }
}

module.exports = new QueueService();