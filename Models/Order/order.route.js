const express = require('express')
const {
  postOrder,
  getAllOrder,
  getMyOrder,
  cancelMyOrder
} = require('./order.controller')
const verifyToken = require('../../middleware/verifyToken')
const VerifyAdmin = require('../../middleware/VerifyAdmin')
const router = express.Router()

router.route('/cancel-my-order/:id').put(verifyToken, cancelMyOrder)
router.route('/get-order').get(VerifyAdmin, getAllOrder)
router.route('/post-order').post(verifyToken, postOrder)
router.route('/get-my-order').get(verifyToken, getMyOrder)

module.exports = router
