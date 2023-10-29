const express = require('express')
const Orders = require('./order.modules')

module.exports.postOrder = async (req, res, next) => {
  try {
    const order = req.body
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
        path: 'orders.food',
        select: '_id name category imageURL price'
      })
      .populate({
        path: 'rider', // Populate the 'rider' field
        populate: {
          path: 'details',
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

module.exports.getMyOrder = async (req, res, next) => {
  try {
    const { id } = req.user
    const result = await Orders.find({ user: id })
      .populate({
        path: 'user',
        select: '-password -updatedAt -createdAt -Admin -rider'
      })
      .populate({
        path: 'orders.food',
        select: '_id name category imageURL price'
      })
      .populate({
        path: 'rider', // Populate the 'rider' field
        populate: {
          path: 'details',
          select: 'name phoneNumber '
        },
        select: '-rider -completed_orders -_id -__v'
      })
    res.status(200).json({
      status: 'Success',
      message: 'Get my order successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Fail to get my order',
      error: error.message
    })
  }
}

module.exports.cancelMyOrder = async (req, res, next) => {
  try {
    const { id } = req.params
    const { id: userID } = req.user

    const orders = await Orders.findOne({ _id: id, user: userID })
    if (!orders) {
      return res.status(404).json({
        status: 'Fail',
        message: 'NO Order Found'
      })
    }
    if (orders.status != 'Pending') {
      console.log('Inside: ', orders.status)
      return res.status(403).json({
        status: 'Fail',
        message: `Order has been already ${orders.status}`
      })
    }

    const result = await Orders.updateOne(
      { _id: id },
      {
        $set: {
          status: 'Cancel'
        }
      }
    )

    res.status(400).json({
      status: 'success',
      message: 'Order successfully cancelled',
      data: orders
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Fail to cancel my order',
      error: error.message
    })
  }
}
