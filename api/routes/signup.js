const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res, next) => {
  const { email, password, name } = req.body
  const user = new User({ email, password, name })

  try {
    const doc = await user.save()
      res.status(200).send({
        data: [doc]
      })
  } catch(e) {
    console.log(e)
    next(e)
  }
})

exports.router = router;