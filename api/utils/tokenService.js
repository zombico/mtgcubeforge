const jwt = require('jsonwebtoken')
const { SECRET } = require('./constants')

const create = user => {
  // grab the user's id
  const id = user._id

  // create the payload
  const payload = {
    user: {
      id
    }
  }
  // generate token and sign it with our secret
  return jwt.sign(payload, SECRET)
}
const verify = token => jwt.verify(token, SECRET)
module.exports = {
  create, verify
}