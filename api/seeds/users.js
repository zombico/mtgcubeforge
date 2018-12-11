// Require our User model so we can create new users
const User = require('../models/User')

// Create an array to store our fake users
const users = []

const fulgren = new User({
  name: 'Fulgren'
})
users.push(fulgren)

const kosaku = new User({
  name: 'Kosaku'
})
users.push(kosaku)

module.exports = users