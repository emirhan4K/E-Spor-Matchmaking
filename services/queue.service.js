class QueueService {
  constructor() {
    this.waitingPlayers = []; 
  }
  joinQueue(player) {
    if(!player){
        throw new Error("Oyuncu bulunamadı!")
    }
    const exists  = this.waitingPlayers.find((p)=> p.socketId === player.socketId)
    if(!exists ){
        this.waitingPlayers.push(player)
    }
  }
  leaveQueue(socketId) {
    this.waitingPlayers = this.waitingPlayers.filter((player)=> player.socketId !== socketId);
  }

  checkMatch() {
    if(this.waitingPlayers.length >= 2){
     const matchedPlayers = this.waitingPlayers.splice(0,2);
     return matchedPlayers;
    }
    return null;
  }
}

module.exports = new QueueService();