const { ObjectId } = require('mongodb')
const validator = require('validator')
const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  user: {
    email: {
      type: String,
      validate: [validator.isEmail, 'Please provide a valid email'],
      required: [true, 'Must provide user email']
    },
    id: {
      type: ObjectId,
      ref: 'User'
    }
  },
  deliveryAddress: {
    type: String,
    required: [true, 'Must provide delivery address']
  },
  roomNumber: {
    type: String
  },
  orders: [
    {
      quantity: {
        type: Number
      },
      id: {
        type: ObjectId,
        ref: 'Foods'
      }
    }
  ],
  status: {
    type: String,
    enum: ['Accepted', 'Pending', 'Rejected'],
    default: 'Pending'
  },
  rider: {
    type: ObjectId,
    ref: 'Riders'
  }
})

const Orders = mongoose.model('Orders', orderSchema)

module.exports = Orders
