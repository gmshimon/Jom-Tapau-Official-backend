const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../User/User.modules')
const Riders = require('../Rider/rider.modules')

module.exports.addRider = async (req, res, next) => {
  try {
    const id = req.body.id
    const result = await User.updateOne(
      { _id: id },
      {
        $set: {
          rider: 'accepted'
        }
      }
    )
    if (result.acknowledged) {
      const user = await User.findOne({ _id: id })
      const riderDetails = {
        details: {
          email: user.email,
          user: id
        },
        rider: 'accepted'
      }
      const riderAdd = await Riders.create(riderDetails)
    }
    res.status(200).json({
      status: 'success',
      message: 'Rider has been accepted',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to Accept rider',
      error: error.message
    })
  }
}
module.exports.rejectRider = async (req, res, next) => {
  try {
    const id = req.body.id
    const result = await User.updateOne(
      { _id: id },
      {
        $set: {
          rider: 'rejected'
        }
      }
    )
    res.status(200).json({
      status: 'success',
      message: 'Rider has been successfully rejected',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to login',
      error: error.message
    })
  }
}

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const result = await User.find({})
    //.select('-password');
    res.status(200).json({
      status: 'success',
      message: 'User fetched Successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to fetch User',
      error: error.message
    })
  }
}
module.exports.getRider = async (req, res, next) => {
  try {
    const results = await Riders.find({}).populate({
      path: 'details.user',
      select: '-password'
    })

    res.status(200).json({
      status: 'success',
      message: 'Rider fetched Successfully',
      data: results
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to fetch Rider',
      error: error.message
    })
  }
}
