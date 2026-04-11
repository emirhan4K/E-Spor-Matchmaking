const { Server } = require("socket.io");

let io; // io objesini dışarıda tanımlıyoruz ki her metot ulaşabilsin

module.exports = {
  // 1. Sunucu ilk ayağa kalktığında çalışacak olan "Kurucu" metot
  init: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: "*",
      },
    });
    return io;
  },
  
  // 2. İleride Controller'ların io objesini çağırmak için kullanacağı metot
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io henüz başlatılmadı!");
    }
    return io;
  }
};