const { ObjectId } = require('mongodb')
const validator = require('validator')
const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
  {
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
    total: {
      type: Number,
      required: true
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
      enum: ['Accepted', 'Pending', 'Rejected', 'Delivered', 'Cancel'],
      default: 'Pending'
    },
    rider: {
      type: ObjectId,
      ref: 'Riders'
    }
  },
  {
    timestamps: true
  }
)

const Orders = mongoose.model('Orders', orderSchema)

module.exports = Orders
