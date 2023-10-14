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
    if (req.file) {
      deleteImage(req.file)
    }
    res.status(400).json({
      status: 'Fail',
      message: error.message
    })
  }
}
