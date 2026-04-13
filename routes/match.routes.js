const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const matchController = require("../controllers/match.controller");

router.post("/",matchController.createMatch);
router.get("/my-history",authMiddleware,matchController.getMyMatches);

module.exports = router;