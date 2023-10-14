const express = require('express')
const Foods = require('./Food.modules')

module.exports.postFood = async (req, res, next) => {
  try {
    const data = req.body
    const image = req.file.path
    data.imageURL = image
    const result = await Foods.create(data)
    res.status(200).json({
      status: 'Success',
      message: 'Data successfully fetched',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Fail to insert Product'
    })
  }
}
