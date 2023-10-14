const express = require('express')
const VerifyAdmin = require('../../middleware/VerifyAdmin')
const { addRider, getAllUsers, rejectRider } = require('./admin.controller')
const router = express.Router()

router.route('/addRider').put(VerifyAdmin, addRider)
router.route('/reject-rider').put(VerifyAdmin, rejectRider)
router.route('/getAllUsers').get(VerifyAdmin, getAllUsers)

module.exports = router
