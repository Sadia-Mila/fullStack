const userSchema = require("../model/userSchema");
const crypto = require("crypto");

async function otpController(req, res) {
  const { email, otp } = req.body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "User Not Found",
    });
  }
  if (user.isVerified) {
    return res.json({
      message: "User Is verified",
    });
  }
  if (user.otp !== otp || user.expireOtp < Date.now()) {
    return res.status(400).json({
      message: "Invalid otp",
    });
  }
  user.isVerified = true;
  user.otp = undefined;
  user.expireOtp = undefined;
  await user.save();
  res.status(200).json({
    message: "Email verification Done",
  });
}

async function resendOtpController(req, res) {
  const { email } = req.body;
  const resendOtp = await userSchema.findOne({ email });
  if (!resendOtp) {
    return res.json({
      message: "Email not found",
    });
  }
  const otp = crypto.randomInt(100000, 999999).toString();
  const expireOtp = new Date(Date.now() + 10 * 60 * 1000);
  resendOtp.otp = otp;
  resendOtp.expireOtp = expireOtp;
   await resendOtp.save();
  res.status(200).json({
    message: "Resend Otp send",
  });
  
}
module.exports = { otpController, resendOtpController };
