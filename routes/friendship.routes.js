const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const friendshipController = require("../controllers/friendship.controller");

router.post("/request/:id",authMiddleware,friendshipController.sendRequest);

module.exports = router;
