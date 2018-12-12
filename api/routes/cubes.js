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
    const raw = await Cube.findById(cubeId)  
    const doc = raw.contents
    res.status(200).send({
      data: [doc]
    })
  } catch (e) {  
    next(e)
  }
})

// router.delete('/:cube_id', async (req, res, next) => {
//   const cubeId = req.params.cube_id
//   try {
//     const doc = await Cube.findOneAndRemove(cubeId)
//     res.status(202).send({
//       data: [doc]
//     })
//   } catch(e) {
//     next(e)
//   }
// })

router.patch('/:cube_id/:card_id', async (req, res, next) => {
  const cubeId = req.params.cube_id
  const cardId = req.params.card_id
  try {
    const cube = await Cube.findById(cubeId)
    const doc = await cube.contents.findOneAndRemove(cardId)
    res.status(202).send({
      data: [doc]
    })
  } catch(e) {
    next(e)
  }
})

exports.router = router;