const express = require("express");
const router = express.Router();
const passport = require("passport");
const friendshipController = require("../controllers/friendship.controller");

router.post("/request/:id",passport.authenticate("jwt", { session: false }),friendshipController.sendRequest);
router.post("/request/:id/accept",passport.authenticate("jwt", { session: false }),friendshipController.acceptRequest);
router.post("/request/:id/reject",passport.authenticate("jwt", { session: false }),friendshipController.rejectRequest);
router.get("/request/pending",passport.authenticate("jwt", { session: false }),friendshipController.getPendingRequests);
router.get("/list",passport.authenticate("jwt", { session: false }),friendshipController.getFriends);

module.exports = router;
