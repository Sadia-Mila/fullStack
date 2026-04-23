const express = require("express");
const router = express.Router();
const userSchema = require("../model/userSchema");
const emailValidation = require("../helpers/emailValidation");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const emailVarification = require("../helpers/emailVarification");


async function signupController(req, res) {
  try {
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
      // Check duplicate
   const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Generate OTP
  const otp = crypto.randomInt(100000, 999999).toString();
  // console.log("Data sent with otp");

  const expireOtp = new Date(Date.now() + 10 * 60 * 1000);

      //Hash password
  bcrypt.hash(password, 10, function (err, hash) {

    // Create user
    const user = new userSchema({
      firstName,
      lastName,
      email,
      password: hash,
      otp,
      expireOtp,
     
      
    });
     //Send OTP email
    emailVarification(email, otp);
   
    //Save user
    user.save();
    res.json({
      message: "Data Send",
    });
    
   
    
  });
    
  } catch (error) {
     // ✅ Handle duplicate index error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });

    
  }
  
}

async function getAllUser(req, res) {
  const userList = await userSchema.find({});
  res.json({
    message: "User List",
    data: userList,
  });
}

module.exports = {signupController, getAllUser};
