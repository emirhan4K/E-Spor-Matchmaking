const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const statController = require("../controllers/stat.controller");

router.put("/match-result",authMiddleware,statController.updateMatchResult);

module.exports = router;
