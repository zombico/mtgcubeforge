const express = require('express')
const Router = express.Router
const router = Router()
const User = require('../models/User')

// GET /users
router.get('/', async (req, res, next) => {
  try {
    // 1. Find all the users in our database
    const docs = await User.find()
    // 2. If successful, send back 200 OK with users
    res.status(200).send({
      data: docs
    })
  } catch(e) {
    // 3. If unsuccessful, send the error into our error handler
    next(e)
  }
})

// GET /users/:user_id
router.get('/:user_id', async (req, res, next) => {
  console.log('user id')
  // 1. Get the user id out of the params
  const userId = req.params.user_id
  // 2. Look up a user by that ID
  try {
    const doc = await User.findById(userId)
    // 3. If we find the specific user, send back 200 + the user doc
    res.status(200).send({
      data: [doc]
    })
  } catch (e) {
    // 4. If we don't, handle the error
    next(e)
  }
})

// Export router so that it is available to our server
exports.router = router;