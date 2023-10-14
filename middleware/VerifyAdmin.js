const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not login'
      })
    }

    const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET)
    console.log('decoded: ', decoded)
    if (!decoded.admin) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not Admin'
      })
    }
    req.user = decoded

    next()
  } catch (error) {
    res.status(403).json({
      status: 'fail',
      message: 'Invalid token',
      error: error.message
    })
  }
}
