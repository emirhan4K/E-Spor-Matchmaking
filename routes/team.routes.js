const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team.controller");
const passport = require("passport");

router.post("/create",passport.authenticate("jwt", { session: false }),teamController.createTeam);
router.get("/:id",passport.authenticate("jwt", { session: false }),teamController.getTeam);
router.post("/:id/join",passport.authenticate("jwt", { session: false }),teamController.joinTeam);

module.exports = router;
