const express = require('express')
const { postOrder, getAllOrder, getMyOrder } = require('./order.controller')
const verifyToken = require('../../middleware/verifyToken')
const VerifyAdmin = require('../../middleware/VerifyAdmin')
const router = express.Router()

router.route('/get-order').get(VerifyAdmin, getAllOrder)
router.route('/post-order').post(verifyToken, postOrder)
router.route('/get-my-order').get(verifyToken, getMyOrder)

module.exports = router
