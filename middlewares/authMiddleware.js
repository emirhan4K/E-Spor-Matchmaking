const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message: "Erişim reddedildi, token bulunamadı!"})
    }

    const token = authHeader.split(" ")[1]; 

    if(!token){
         return res.status(401).json({message: "Yetkisiz Erisim: Gecersiz Token Bilgisi!"})
    }
    try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(401).json({message: "Yetkisiz Erisim: Gecersiz veya Süresi Dolmus Token!"})
    }
}

module.exports = authMiddleware;