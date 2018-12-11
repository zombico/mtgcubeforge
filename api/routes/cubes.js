const express = require('express')
const Router = express.Router
const router = Router()
const Cube = require('../models/Cube')


router.get('/', async (req, res, next) => {
  try {

    const docs = await Cube.find()

    res.status(200).send({
      data: docs
    })
  } catch(e) {

    next(e)
  }
})


router.get('/:cube_id', async (req, res, next) => {
  
  const cubeId = req.params.cube_id
  
  try {
    const doc = await Cube.findById(cubeId)
  
    res.status(200).send({
      data: [doc]
    })
  } catch (e) {
  
    next(e)
  }
})


exports.router = router;