const express = require("express")
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload.middleware");

router.get("/profile",authMiddleware,userController.getProfile)
router.put("/profile", authMiddleware, userController.updateProfile)
router.put("/password", authMiddleware, userController.changePassword)
router.delete("/profile", authMiddleware, userController.deleteAccount)
router.put("/avatar", authMiddleware, upload.single("avatar"), userController.updateAvatar);
router.get("/online", userController.getOnlineUsers);
module.exports = router;