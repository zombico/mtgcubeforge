const tokenService = require('../utils/tokenService')

module.exports = async (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    return next(new Error('unauthorized'))
  }
  // split the Bearer from the token
  const token = authHeader.split(' ')[1]
  
  try {
    const decoded = await tokenService.verify(token)
    req.token = decoded
    next()
  } catch (e) {
    next(new Error('unauthorized'))
  }
}