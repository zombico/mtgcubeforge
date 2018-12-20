const User = require('../models/User')

module.exports = async (req, res, next) => {
  try {
    const { id } = req.token.user
      // find the user in our db by t heir id
    const doc = await User.findById(id)
      // if we find the user
    if(doc) {
      req.user = doc
      next()
    } else {
      next(new Error('not found'))
    }
  } catch(e) {
    next(e)
  }
}