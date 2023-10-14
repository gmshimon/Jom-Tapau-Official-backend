const express = require('express')
const Foods = require('./Food.modules')
const fs = require('fs')
const path = require('path')

const deleteImage = file => {
  const filePath = path.join(__dirname, '../../images', file.filename)
  fs.unlink(filePath, unlinkError => {
    if (unlinkError) {
      console.error('Failed to delete the uploaded file:', unlinkError)
    } else {
      console.log('Uploaded file deleted successfully.')
    }
  })
}

module.exports.getFood = async (req, res, next) => {
  try {
    const result = await Foods.find({})
    res.status(200).json({
      status: 'Success',
      message: 'Food successfully fetched',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Fail to Fetch food'
    })
  }
}

module.exports.postFood = async (req, res, next) => {
  try {
    const data = req.body
    const image = 'http://localhost:5000/images/' + req.file.filename
    console.log(req.file)
    data.imageURL = image
    const result = await Foods.create(data)

    res.status(200).json({
      status: 'Success',
      message: 'Data successfully fetched',
      data: result
    })
  } catch (error) {
    if (req.file) {
      deleteImage(req.file)
    }
    res.status(400).json({
      status: 'Fail',
      message: error.message
    })
  }
}
