const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const http = require("http");
const path = require("path");

//Utils & DB
const socket = require("./utils/socket"); 
const connectDB = require("./config/db"); 

//PROJEYİ BAŞLATMA
const app = express();
connectDB();

//Middlewares
app.use(express.json());
const errorHandler = require("./middlewares/errorHandler.middleware");

//Route Imports
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const statRoutes = require("./routes/stat.routes");
const teamRoutes = require("./routes/team.routes");
const matchRoutes = require("./routes/match.routes");
const walletRoutes = require("./routes/wallet.routes");

//API Routes
app.use("/api/auth",authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stats",statRoutes)
app.use("/api/teams", teamRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Global hata yakalayıcı
app.use(errorHandler); 

const httpServer = http.createServer(app);
const io = socket.init(httpServer);

// Canlı Eşleştirme Kuyruğunu Başlat
require("./sockets/queue.socket")(io);

httpServer.listen(3000, () => {
    console.log(`🚀 Sunucu 3000 portunda çalışıyor`);
});