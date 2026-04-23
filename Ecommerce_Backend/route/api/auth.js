const express = require("express");
const {signupController, getAllUser} = require("../../controllers/signupController");
const {otpController, resendOtpController} = require("../../controllers/otpController");
const {loginController, logOutController, dashboardController, currentuserController, privateroute} = require("../../controllers/loginController");
const authMiddleware = require("../../middleware/authMiddleware");
const userSchema = require("../../model/userSchema");
const router = express.Router();

router.post("/signup", signupController);
router.post("/otpVerify", otpController);
router.post("/resendotp", resendOtpController);
router.post("/login", loginController);
router.post("/logout", logOutController);
router.get("/currentuser", currentuserController);
router.get("/dashboard", authMiddleware, dashboardController);

router.get("/userlist", getAllUser)

// private rote
router.get("/getme", authMiddleware, privateroute)

// example for practice
// router.get('/getme', (req, res)=>{
//     const finduser = await userSchema.findOne({email:req.session.user.email})
//     res.send(finduser)
// })
// private rote

module.exports = router;
