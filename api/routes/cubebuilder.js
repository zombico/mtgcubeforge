const express = require('express')
const Router = express.Router
const router = Router()
const Cube = require('../models/Cube')


router.patch('/cubes/:cube_id/add', async (req, res, next) => {
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

router.patch('/cubes/:cube_id/remove', async (req, res, next) => {
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

router.post('/newcube', async (req, res, next) => {
  const { username, cubename } = req.body
  const contents = []
  const newcube = new Cube({ username, cubename, contents })

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