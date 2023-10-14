const express = require('express')
const User = require('./User.modules')
const bcrypt = require('bcrypt')
const { generateToken } = require('../../utilis/token')
const { ObjectId } = require('mongodb')

module.exports.postUser = async (req, res, next) => {
  try {
    const result = await User.create(req.body)
    res.status(200).json({
      status: 'success',
      message: 'User created successfully',
      data: result
    })
  } catch (e) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to insert User',
      error: e.message
    })
  }
}

module.exports.loginUser = async (req, res, next) => {
  try {
    const { email, pass } = req.body
    if (!email || !pass) {
      return res.status(403).json({
        status: 'Fail',
        message: 'Please provide credentials'
      })
    }
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({
        status: 'Fail',
        message: 'No user with this email'
      })
    }
    const isPasswordValid = bcrypt.compareSync(pass, user.password)
    if (!isPasswordValid) {
      return res.status(403).json({
        status: 'Fail',
        message: 'Wrong password'
      })
    }
    const token = generateToken(user)

    const { password, ...others } = user.toObject()
    res.status(200).json({
      status: 'Success',
      message: 'Login successful',
      data: others,
      token: token
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to login',
      error: error.message
    })
  }
}

module.exports.getMe = async (req, res, next) => {
  try {
    console.log(req.user)
    const email = req.user?.email

    const user = await User.findOne({ email: email }).select('-password')
    res.status(200).json({
      status: 'success',
      message: 'Verified',
      data: user
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to login',
      error: error.message
    })
  }
}
