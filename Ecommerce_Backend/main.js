require("dotenv").config();
const express = require("express");
const session = require("express-session");
const dbConnection = require("./dababase/dbConnection");
const route = require("./route");
const categoryController = require("./controllers/categoryController");
const app = express();
const cors = require('cors')
const path = require('path')
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors())

app.use(
  session({
    secret: "MERN 2407",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
dbConnection();
app.use(route);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
