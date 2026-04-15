const express = require("express")
const router = express.Router();
const passport = require("passport");
const walletController = require("../controllers/wallet.controller");

router.post("/:id/buy",passport.authenticate("jwt", { session: false }),walletController.buyItem);

module.exports = router;