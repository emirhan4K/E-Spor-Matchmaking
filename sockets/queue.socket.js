const queueService = require("../services/queue.service");

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log(`🟢 Yeni bir oyuncu hatta bağlandı! ID: ${socket.id}`);

        socket.on("join_queue", (playerData) => {
            playerData.socketId = socket.id;
            queueService.joinQueue(playerData);
            console.log(`⏳ ${playerData.username} maç arıyor...`);

            const match = queueService.checkMatch();

            if (match) {
                console.log(`⚔️ EŞLEŞME BULUNDU! ${match[0].username} VS ${match[1].username}`);
                io.to(match[0].socketId).emit("match_found", match);
                io.to(match[1].socketId).emit("match_found", match);
            }
        });

        socket.on("leave_queue", () => {
            queueService.leaveQueue(socket.id);
            console.log(`❌ Bir oyuncu sıradan çıktı.`);
        });

        socket.on("disconnect", () => {
            queueService.leaveQueue(socket.id);
            console.log(`🔴 Oyuncu hattan düştü! ID: ${socket.id}`);
        });
    });
};