const mongoose = require('mongoose')

const User = require('../models/User')
const Cube = require('../models/Cube')
const users = require('./users')
const cubes = require('./cubes')
const uri = 'mongodb://localhost:27017/cubeforge'

const truncateDatabase = async () => {
  return Promise.all([User.deleteMany(), Cube.deleteMany()])
}

const makeSeeds = async () => {
  
  await mongoose.connect(uri)
  
  await truncateDatabase()
  
  await Promise.all(users.map(user => user.save()))
  const docs = await User.find({})
  
  // turn on Koichi's cube
  cubes[0].username = docs[0].name
  
  await Promise.all(cubes.map(cube => cube.save()))
  
  mongoose.connection.close()
}

makeSeeds()