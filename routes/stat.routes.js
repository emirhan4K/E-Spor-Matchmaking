const express = require("express");
const router = express.Router();
const passport = require("passport");
const statController = require("../controllers/stat.controller");

router.put("/match-result",passport.authenticate("jwt", { session: false }),statController.updateMatchResult);
router.get("/leaderboard",statController.getLeaderboard);

module.exports = router;
