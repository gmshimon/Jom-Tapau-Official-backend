const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../User/User.modules')
const Riders = require('../Rider/rider.modules')

module.exports.addRider = async (req, res, next) => {
  try {
    const id = req.body.id
    const existedRider = await Riders.findOne({ details: id })
    if (existedRider) {
      if (existedRider.rider === 'accepted') {
        return res.status(409).json({
          status: 'Fail',
          message: 'Rider Already Exists'
        })
      } else if (existedRider.rider === 'rejected') {
        const acceptRider = await Riders.updateOne({
          _id: existedRider._id,
          $set: {
            rider: 'accepted'
          }
        })
        return res.status(200).json({
          status: 'success',
          message: 'Rider has been accepted',
          data: acceptRider
        })
      }
    }
    const result = await User.updateOne(
      { _id: id },
      {
        $set: {
          rider: 'accepted'
        }
      }
    )
    if (result.acknowledged) {
      const riderDetails = {
        details: id,
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
    const existedRider = await Riders.findOne({ details: id })
    if (existedRider && existedRider.rider === 'accepted') {
      const rejectedRider = await Riders.updateOne(
        {
          _id: existedRider._id
        },
        {
          $set: {
            rider: 'rejected'
          }
        }
      )

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
    } else {
      res.status(404).json({
        status: 'Fail',
        message: "Couldn't find Rider"
      })
    }
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
      path: 'details',
      select: 'name email phoneNumber rider'
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
