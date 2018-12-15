const express = require('express');
const router = express.Router();
const Cube = require('../models/Cube');

router.post('/', async (req, res, next) => {
  const { name, userId } = req.body
  const contents = []
  const newcube = new Cube({ name, userId, contents })

  try {
    const doc = await newcube.save()
      res.status(200).send({
        data: [doc]
      })
  } catch(e) {
    console.log(e)
    next(e)
  }
})

exports.router = router;