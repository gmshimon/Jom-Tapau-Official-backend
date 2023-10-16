const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const validator = require('validator')

const riderSchema = mongoose.Schema({
  details: {
    email: {
      type: String,
      validate: [validator.isEmail, 'Please provide a valid email'],
      required: [true, 'Must provide Rider email']
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: [true, 'Must provide User ID']
    }
  },
  rider: {
    type: String,
    default: 'Accepted',
    enum: ['pending', 'accepted', 'rejected']
  },
  completed_orders: [
    {
      date: {
        type: String
      },
      address: {
        type: String
      },
      total_price: {
        type: Number
      },
      orders: {
        type: ObjectId,
        ref: 'Orders'
      }
    }
  ]
})

const Riders = mongoose.model('Riders', riderSchema)

module.exports = Riders
