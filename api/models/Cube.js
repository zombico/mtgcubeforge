const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cubeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  contents: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('Cube', cubeSchema)