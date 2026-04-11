const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Veri tabanına bağlanıldı..")
  } catch (error) {
    console.log("DB Bağlantı hatası",error);
    process.exit(1);
  }
};
module.exports = connectDB;
