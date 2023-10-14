const express = require('express')
const { postUser, loginUser, getMe } = require('./user.controller')
const verifyToken = require('../../middleware/verifyToken')
const router = express.Router()

router.route('/signup').post(postUser)
router.route('/login').post(loginUser)
router.route('/me').get(verifyToken, getMe)

module.exports = router
