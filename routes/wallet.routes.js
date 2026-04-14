const express = require("express")
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const walletController = require("../controllers/wallet.controller");

router.post("/:id/buy",authMiddleware,walletController.buyItem);

module.exports = router;