// Require our User model so we can create new users
const User = require('../models/User')

// Create an array to store our fake users
const users = []

const koichi = new User({
  name: 'koichi',
  email: 'koichi@speedwagon.io',
  password: 'act3'
})
users.push(koichi)

const fulgren = new User({
  name: 'Fulgren',
  email: 'mrdude@gmail.com',
  password: 'bananas'
})
users.push(fulgren)



module.exports = users