const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Dosyaların kaydedileceği klasör
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    // Dosya ismini benzersiz yapıyoruz
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Sadece resim dosyalarına izin ver
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Lütfen sadece resim dosyası yükleyin!"), false);
  }
};

// Multer'ı Başlat 
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, 
    fileFilter: fileFilter
});

module.exports = upload;