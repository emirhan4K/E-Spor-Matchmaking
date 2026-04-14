const errorHandler = (err, req, res, next) => {
  // Eğer hatanın özel bir statü kodu yoksa 500 (Sunucu Hatası) ver
  const statusCode = err.statusCode || 500;
  
  // Hatanın mesajını al yoksa bir metin göster
  const message = err.message || "Sunucuda beklenmeyen bir hata oluştu!";

  // Hatayı müşteriye JSON formatında gönderir
  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

module.exports = errorHandler;