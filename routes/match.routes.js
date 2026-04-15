const express = require("express");
const router = express.Router();
const passport = require("passport");
const matchController = require("../controllers/match.controller");

router.post("/",matchController.createMatch);
router.get("/my-history",passport.authenticate("jwt", { session: false }),matchController.getMyMatches);

module.exports = router;