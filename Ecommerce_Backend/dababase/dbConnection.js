const mongoose = require("mongoose");

function dbConnection() {
  mongoose
    .connect(
    //   "mongodb+srv://ecommerceapi:sadia@ecommerceapi.dsyi046.mongodb.net/?appName=ecommerceapi"
    //   `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@ecommerceapi.dsyi046.mongodb.net/?appName=${process.env.DB_NAME}`

    `${process.env.DB_URL}`
    )
    .then(() => console.log("DB Connected!"));
}

module.exports = dbConnection
