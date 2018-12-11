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
    type: Object,
    required: true
  }
})

module.exports = {
  Cube: mongoose.model('Cube', cubeSchema)
}