const express = require('express')
const Orders = require('./order.modules')

module.exports.postOrder = async (req, res, next) => {
  try {
    const order = req.body
    // console.log(req.protocol + '://' + req.get('host') + '/images')
    const result = await Orders.create(order)
    res.status(200).json({
      status: 'success',
      message: 'Order posted successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to post order',
      error: error.message
    })
  }
}

module.exports.getAllOrder = async (req, res, next) => {
  try {
    const result = await Orders.find({})
      .populate({
        path: 'user',
        select: '-password -updatedAt -createdAt -Admin -rider'
      })
      .populate({
        path: 'rider', // Populate the 'rider' field
        populate: {
          path: 'user',
          select: 'name phoneNumber '
        },
        select: '-rider -completed_orders -_id -__v'
      })
    res.status(200).json({
      status: 'success',
      message: 'Order retrieved successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to get all order',
      error: error.message
    })
  }
}
