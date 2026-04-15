const express = require("express")
const router = express.Router();
const userController = require("../controllers/user.controller");
const passport = require("passport");
const upload = require("../middlewares/upload.middleware");

router.get("/profile",passport.authenticate("jwt", { session: false }),userController.getProfile)
router.put("/profile", passport.authenticate("jwt", { session: false }), userController.updateProfile)
router.put("/password", passport.authenticate("jwt", { session: false }), userController.changePassword)
router.delete("/profile", passport.authenticate("jwt", { session: false }), userController.deleteAccount)
router.put("/avatar", passport.authenticate("jwt", { session: false }), upload.single("avatar"), userController.updateAvatar);
router.get("/online", userController.getOnlineUsers);
module.exports = router;