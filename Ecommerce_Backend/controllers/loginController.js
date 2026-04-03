const emailValidation = require("../helpers/emailValidation");
const userSchema = require("../model/userSchema");
const bcrypt = require("bcrypt");

async function loginController(req, res) {
  const { email, password } = req.body;
  if (!email) {
    return res.json({ error: "Email is required" });
  }
  if (!password) {
    return res.json({ error: "Password is required" });
  }
  if (!emailValidation(email)) {
    return res.json({ error: "Email format is not valid" });
  }

  const existingUser = await userSchema.findOne({ email });

  if (!existingUser) {
    return res.json({ message: "user is not found in DB" });
  }
  if (!existingUser.isVerified) {
    return res.json({ message: "user is not verified" });
  } else {
    bcrypt.compare(password, existingUser.password, function (err, result) {
      if (result) {
        return res.json({ message: "Login Done Successfully" });
      } else {
        res.json({ message: "Password is not matched" });
      }
    });
    req.session.isAuth = true;
    req.session.userSchema = {
      id: existingUser.id,
      email: existingUser.email,
      firstName: existingUser.firstName,
    };
  }
}

function logOutController(req, res) {
  req.session.destroy(function (err) {
    if (err) {
      res.status(400).json({ error: "Something Wrong!" });
    }
    res.status(200).json({
      message: "Logout Done",
    });
  });
}

function dashboardController(req, res) {
  res.json({ message: "Wel Come to Dashboard" });
}

module.exports = { loginController, logOutController, dashboardController };
