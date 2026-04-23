require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const fs = require('fs');


// Configuration
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET,

});
// console.log(process.env.CLOUD_NAME);



const uploadImage = async (filename)=>{
    const result  = await cloudinary.uploader.upload(filename)
  //  console.log(result);
  //for deleting local file
   fs.unlinkSync(filename)
   return result;
}



module.exports = uploadImage
