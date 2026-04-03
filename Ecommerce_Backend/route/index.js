const express = require('express')
const router = express.Router()
const apiRoute = require('./api')
const authRoute = require('./api/auth')


router.use("/api/v1", apiRoute)
router.use("/auth", authRoute)


module.exports = router