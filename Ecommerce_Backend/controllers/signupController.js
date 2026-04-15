const express = require("express");
const router = express.Router();
const userSchema = require("../model/userSchema");
const emailValidation = require("../helpers/emailValidation");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const emailVarification = require("../helpers/emailVarification");


async function signupController(req, res) {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    return res.json({
      message: "Error: firstName and lastName is required",
    });
  }
  if (!email) {
    return res.json({
      message: "Error: email is required",
    });
  }
  if (!password) {
    return res.json({
      message: "Error: password required",
    });
  }
  if (!emailValidation(email)) {
    return res.json({
      message: "Error: Email format is not valid",
    });
  }

  const duplicateEmail = await userSchema.find({ email });
  // console.log(duplicateEmail);

  if (duplicateEmail.length> 0) {
    return res.json({
      message: "Duplicate Email",
    });
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  // console.log("Data sent with otp");

  const expireOtp = new Date(Date.now() + 10 * 60 * 1000);

  
  bcrypt.hash(password, 10, function (err, hash) {
    const user = new userSchema({
      firstName,
      lastName,
      email,
      password: hash,
      otp,
      expireOtp,
     
      
    });
    emailVarification(email, otp);
    user.save();
    res.json({
      message: "Data Send",
    });
  });
}

async function getAllUser(req, res) {
  const userList = await userSchema.find({});
  res.json({
    message: "User List",
    data: userList,
  });
}

module.exports = {signupController, getAllUser};
