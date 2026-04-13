const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const statController = require("../controllers/stat.controller");

router.put("/match-result",authMiddleware,statController.updateMatchResult);
router.get("/leaderboard",statController.getLeaderboard);

module.exports = router;
