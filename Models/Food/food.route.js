const express = require('express')
const { postFood, getFood } = require('./food.controller')
const router = express.Router()
const uploader = require('../../middleware/fileUpload/uploader')
const VerifyAdmin = require('../../middleware/VerifyAdmin')

router.route('/delete-food/:id').delete(VerifyAdmin)
router.route('/foods').get(VerifyAdmin, getFood)
router.route('/post-food').post(VerifyAdmin, uploader.single('image'), postFood)

module.exports = router
