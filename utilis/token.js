const jwt = require('jsonwebtoken')

module.exports.generateToken = userInfo => {
  const playLoad = {
    email: userInfo.email,
    admin: userInfo.Admin
  }

  const token = jwt.sign(playLoad, process.env.TOKEN_SECRET, {
    expiresIn: '100000s'
  })

  return token
}
