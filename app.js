const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const http = require("http");
const socket = require("./utils/socket"); 
const connectDB = require("./config/db"); 

const app = express();
connectDB();
app.use(express.json());

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");


app.use("/api/auth",authRoutes);
app.use("/api/users", userRoutes);

const httpServer = http.createServer(app);
const io = socket.init(httpServer);

io.on("connection", (socket) => {
    console.log(`🟢 Yeni bir oyuncu bağlandı! Oyuncu ID: ${socket.id}`);
});

httpServer.listen(3000, () => {
    console.log(`🚀 Sunucu 3000 portunda çalışıyor`);
});