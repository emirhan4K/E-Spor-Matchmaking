const NotFoundException = require("../exceptions/NotFoundException");

class QueueService {
  constructor() {
    this.waitingPlayers = []; 
  }
  joinQueue(player) {
    if(!player){
        throw new NotFoundException("Oyuncu bulunamadı!")
    }
    const exists  = this.waitingPlayers.find((p)=> p.socketId === player.socketId)
    if(!exists ){
        this.waitingPlayers.push(player)
    }
    const matchFound = this.checkMatch();
    if (matchFound) {
      console.log("🎮 Maç bulundu! Eşleşen oyuncular:", matchFound);
    }
  }
  leaveQueue(socketId) {
    this.waitingPlayers = this.waitingPlayers.filter((player)=> player.socketId !== socketId);
  }

  checkMatch() {
    if(this.waitingPlayers.length >= 2){ // Sırada 2 veya daha fazla kişi varsa
     const matchedPlayers = this.waitingPlayers.splice(0,2); // İlk 2 kişiyi kuyruktan kopar ve geri dön
     return matchedPlayers;
    }
    return null;
  }
}

module.exports = new QueueService();