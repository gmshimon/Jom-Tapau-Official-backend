const express = require('express')
const Foods = require('./Food.modules')
const fs = require('fs')
const path = require('path')

const deleteImage = file => {
  const filePath = path.join(__dirname, '../../images', file)
  fs.unlink(filePath, unlinkError => {
    if (unlinkError) {
      console.error('Failed to delete the uploaded file:', unlinkError)
    } else {
      console.log('Uploaded file deleted successfully.')
    }
  })
}
// controller and service to post data
module.exports.postFood = async (req, res, next) => {
  try {
    const data = req.body
    const image = 'http://localhost:5000/images/' + req.file.filename
    data.imageURL = image
    const result = await Foods.create(data)

    res.status(200).json({
      status: 'Success',
      message: 'Data successfully fetched',
      data: result
    })
  } catch (error) {
    if (req.file) {
      deleteImage(req.file.filename)
    }
    res.status(400).json({
      status: 'Fail',
      message: error.message
    })
  }
}

// Controller and service to fetch all foods
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

// controller and service to delete the food

module.exports.deleteFood = async (req, res, next) => {
  try {
    const id = req.params.id
    const food = await Foods.findOne({ _id: id })
    const result = await Foods.deleteOne({ _id: id })
    if (result.acknowledged) {
      const imageFileName = food.imageURL.split('images/')[1]
      deleteImage(imageFileName)
    }
    res.status(200).json({
      status: 'Success',
      message: 'Food successfully deleted',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error.message
    })
  }
}
module.exports.getSingleFood = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await Foods.findOne({ _id: id })
    res.status(200).json({
      status: 'Success',
      message: 'Food successfully deleted',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error.message
    })
  }
}

module.exports.searchFood = async (req, res, next) => {
  try {
    const searchText = req.body.text
    const result = await Foods.find({})

    const searchedFood = result.filter(res => {
      return res.name.toLowerCase().includes(searchText.toLowerCase())
    })
    res.status(200).json({
      status: 'Success',
      message: 'Retrieve search food successfully',
      data: searchedFood
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error.message
    })
  }
}
