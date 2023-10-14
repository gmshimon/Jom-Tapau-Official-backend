const express = require('express')
const { postFood } = require('./food.controller')
const router = express.Router()
const uploader = require('../../middleware/fileUpload/uploader')

router.route('/post-food').post(uploader.single('image'), postFood)

module.exports = router
