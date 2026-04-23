const emailValidation = require("../helpers/emailValidation");
const userSchema = require("../model/userSchema");
const bcrypt = require("bcrypt");

async function loginController(req, res) {
  const { email, password } = req.body;
  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }
  if (!password) {
    return res.json({ success: false, message: "Password is required" });
  }
  if (!emailValidation(email)) {
    return res.json({ success: false, message: "Email format is not valid" });
  }

  const existingUser = await userSchema.findOne({ email });

  if (!existingUser) {
    return res.json({ success: false, message: "user is not found in DB" });
  }
  if (!existingUser.isVerified) {
    return res.json({ success: false, message: "user is not verified" });
  } else {
    bcrypt.compare(password, existingUser.password, function (err, result) {
      if (result) {
        req.session.isAuth = true;
        req.session.user = {
          id: existingUser.id,
          email: existingUser.email,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          profileImage: existingUser.profileImage,
        };
        return res.json({ success: true, message: "Login Done Successfully" });
      } else {
        return res.json({ success: false, message: "Password is not matched" });
      }
    });
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

//current user controller
function currentuserController(req, res) {
  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      message: "No user",
    });
  }

  res.json({
    success: true,
    user: req.session.user,
  });
}
//current user controller

//priviate route controller
async function privateroute(req, res) {
  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const finduser = await userSchema.findOne({
    email: req.session.user.email,
  });

  res.json({
    success: true,
    data: finduser,
  });
}

//priviate route

module.exports = {
  loginController,
  logOutController,
  dashboardController,
  currentuserController,
  privateroute,
};
