const { ObjectId } = require('mongodb')
const validator = require('validator')
const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User'
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
      food: {
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
