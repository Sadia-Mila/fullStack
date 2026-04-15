const express = require("express");
const {signupController, getAllUser} = require("../../controllers/signupController");
const {otpController, resendOtpController} = require("../../controllers/otpController");
const {loginController, logOutController, dashboardController, currentuserController} = require("../../controllers/loginController");
const authMiddleware = require("../../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", signupController);
router.post("/otpVerify", otpController);
router.post("/resendotp", resendOtpController);
router.post("/login", loginController);
router.get("/logout", logOutController);
router.get("/currentuser", currentuserController);
router.get("/dashboard", authMiddleware, dashboardController);

router.get("/userlist", getAllUser)

module.exports = router;
