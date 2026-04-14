const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const friendshipController = require("../controllers/friendship.controller");

router.post("/request/:id",authMiddleware,friendshipController.sendRequest);
router.post("/request/:id/accept",authMiddleware,friendshipController.acceptRequest);
router.post("/request/:id/reject",authMiddleware,friendshipController.rejectRequest);

module.exports = router;
