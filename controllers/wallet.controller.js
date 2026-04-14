const walletService = require("../services/wallet.service");

class WalletController{
    async buyItem(req,res,next){
        const userId = req.user.userId;
        const item = req.params.id;
        try {
            const result = await walletService.buyItem(userId,item)
            res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new WalletController();