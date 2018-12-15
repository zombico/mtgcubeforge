const express = require('express')
const Router = express.Router
const router = Router()
const User = require('../models/user')

const { verifyToken } = require('../middleware/auth')

const getUserById = async (req, res, next) => {
  const { user } = req.decoded
  if (user && user.id) {
    try {
      const doc = await User.findById(user.id)
      req.user = doc
      next()
    } catch (e) {
      next(e)
    }
  }
}

router.get('/current', verifyToken, getUserById, (req, res, next) => {
  if (req.user) {
    res.status(200).send(req.user)
  } else {
    next(new Error('not found'))
  }
})

module.exports = router
