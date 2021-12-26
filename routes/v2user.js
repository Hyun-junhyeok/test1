const express = require('express')
const v2userController = require("../controllers/v2user")
const router = express.Router()

router.post('/', v2userController.postUser)

module.exports = router