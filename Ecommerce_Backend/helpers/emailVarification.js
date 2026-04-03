const nodemailer = require("nodemailer");

async function emailVarification(email, otp) {
    const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, 
  auth: {
    user: "sadiahaque2017@gmail.com",
    pass: "vkxifrbqttescqbp",
  },
})

const info = await transporter.sendMail({
    from: '"MERN ECommerce:" <sadiahaque2017@gmail.com>',
    to: email,
    subject: "OTP",
    text: "OTP Varification", 
    html: `<h1>Your OTP is: ${otp}</h1>`,
  });

      
}

module.exports = emailVarification