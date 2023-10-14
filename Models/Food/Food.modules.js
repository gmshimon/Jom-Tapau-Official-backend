const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the food name'],
    minLength: [3, 'Name must be at least 3 characters'],
    maxLength: [100, 'Name is too large']
  },
  category: {
    type: String,
    required: [true, 'Category Name is required'],
    enum: {
      values: ['Lunch', 'Dinner'],
      message: 'Category Name must be Lunch or Dinner'
    }
  },
  imageURL: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    required: [true, 'Please provide a valid price']
  }
})

const Foods = mongoose.model('Foods', foodSchema)

module.exports = Foods
