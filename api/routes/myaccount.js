const express = require('express')
const Router = express.Router
const router = Router()
const user = require('../middleware/user')
const auth = require('../middleware/auth')


router.get('/', auth, user, async (req, res, next) => {
  res.status(200).send({ data: [req.user] })
})

exports.router = router;