const express = require("express");
const router = express.Router();

router.get("/product", (req, res) => {
  res.send({
    title: "Iphone 14 Pro Max",
    price: 200,
    brand: "Apple",
  });
});

module.exports = router;