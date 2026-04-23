const express = require('express')
const router = express.Router()
const authRoute = require('./auth')
const categoryRoute = require('./category')
const subCatagoryRoute = require('./subcategory')
const productRoute = require('./product')
router.use(express.json())

router.use("/auth", authRoute)
router.use("/category", categoryRoute)
router.use("/subcategory", subCatagoryRoute)
router.use("/product", productRoute)


module.exports = router