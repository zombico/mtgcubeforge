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

router.get('/:username/all', async (req, res, next) => {
  const username = req.params.username
  try {
    const cubesmade = await Cube.find({ username })
    const doc = cubesmade
    res.status(200).send({
      data: [doc]
    })
  } catch (e) {
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

router.patch('/:cube_id/add', async (req, res, next) => {
  const cubeId = req.params.cube_id
  const cardObject = req.body
  try {
    const cube = await Cube.findById(cubeId)
    cube.contents.push(cardObject)
    cube.save()
    const doc = cube
    res.status(200).send({
      data: [doc]
    })
  } catch(e) {
    next(e)
  }
})

router.patch('/:cube_id/remove', async (req, res, next) => {
  const cubeId = req.params.cube_id
  const cardObject = req.body
  
  try {
    const cube = await Cube.findById(cubeId)
    
    const updatedCube = cube.contents.filter(card => card.id !== cardObject.id)
    cube.contents = updatedCube
    const doc = cube
    cube.save()
    
    res.status(202).send({
      data: [doc]
    })
  } catch(e) {
    next(e)
  }
})

exports.router = router;