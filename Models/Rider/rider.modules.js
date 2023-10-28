const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const validator = require('validator')

const riderSchema = mongoose.Schema({
  details: {
    type: ObjectId,
    ref: 'User',
    required: [true, 'Must provide User ID']
  },

  rider: {
    type: String,
    default: 'Accepted',
    enum: ['accepted', 'rejected']
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
