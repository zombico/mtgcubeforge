const mongoose = require('mongoose')

const User = require('../models/User')
const Cube = require('../models/Cube')
const users = require('./users')
const cubes = require('./cubes')
const uri = 'mongodb://localhost:27017/cubeforge'

const truncateDatabase = async () => {
  // here we delete all our users and posts so we can start with fresh data
  return Promise.all([User.deleteMany(), Cube.deleteMany()])
}

const makeSeeds = async () => {
  
  await mongoose.connect(uri)
  // delete all old data in the database
  await truncateDatabase()
  
  await Promise.all(users.map(user => user.save()))
  const docs = await User.find({})
  // turn on Fulgren's cube
  cubes[0].userId = docs[0]._id
  
  await Promise.all(cubes.map(cube => cube.save()))
  
  mongoose.connection.close()
}

makeSeeds()