const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team.controller");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create",authMiddleware,teamController.createTeam);
router.get("/:id",authMiddleware,teamController.getTeam);
router.post("/:id/join",authMiddleware,teamController.joinTeam);

module.exports = router;
