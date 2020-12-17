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
    // const raw = await Cube.findById(cubeId)  
    // const doc = raw.contents
    const doc = await Cube.findById(cubeId)  
    res.status(200).send({
      data: [doc]
    })
  } catch (e) {  
    next(e)
  }
})

router.delete('/:cubeId/delete', async (req, res, next) => {
  const cubeId = req.params.cubeId
  try {    
    const cube = await Cube.findByIdAndDelete({ "_id": cubeId })
    cube.save()
    const doc = cube
    res.status(202).send({
      data: [doc]
    })
  } catch(e) {
    next(e)
  }
})

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

router.patch('/:cube_id/overwrite', async (req, res, next) => {
  const cubeId = req.params.cube_id
  const overwrite = req.body.contents
  
  try {
    const cube = await Cube.findById(cubeId)
    cube.contents = overwrite
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
  const cardIndex = req.body.index
  
  try {
    const cube = await Cube.findById(cubeId)
    cube.contents.splice(cardIndex, 1)
    
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