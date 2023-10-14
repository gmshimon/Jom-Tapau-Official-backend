const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

/* name, email, phoneNumber,matricValue,address,rider,Admin */
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide Name']
    },
    email: {
      type: String,
      validate: [validator.isEmail, 'Please provide a valid email'],
      required: [true, 'Email address is required'],
      lowercase: true,
      unique: true,
      trim: true
    },
    imageURL: {
      type: String,
      validate: [validator.isURL, 'Please provide a valid url']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      validate: {
        validator: value => {
          validator.isStrongPassword(value, {
            minLength: 6,
            minNumber: 1
          })
        },
        message: 'Password {VALUE} is not strong'
      }
    },
    confirmPassword: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (value) {
          return value === this.password
        },
        message: 'Passwords dont match'
      }
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please enter a phone number']
    },
    address: {
      type: String,
      required: [true, 'Please provide address']
    },
    rider: {
      type: String,
      default: 'pending',
      enum: ['pending', 'accepted', 'rejected']
    },
    Admin: {
      type: Boolean,
      default: false
    },
    confirmationToken: String,
    confirmationTokenExpires: Date,

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (!err) {
        this.password = hash
        this.confirmPassword = undefined
        next()
      }
      if (err) this.password.message = err
    })
  })
})

const User = mongoose.model('User', userSchema)

module.exports = User
