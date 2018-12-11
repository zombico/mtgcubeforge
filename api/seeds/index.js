const mongoose = require('mongoose')

const User = require('../models/User')
const users = require('./users')
const uri = 'mongodb://localhost:27017/cubeforge'

const truncateDatabase = async () => {
  // here we delete all our users and posts so we can start with fresh data
  return Promise.all([User.deleteMany()])
}

const makeSeeds = async () => {
  // connect to our mongo database
  await mongoose.connect(uri)
  // delete all old data in the database
  await truncateDatabase()
  // save all our users into the database
  await Promise.all(users.map(user => user.save()))
  // save our seeded post into the database
  
  // that's it! close the connection
  mongoose.connection.close()
}

makeSeeds()