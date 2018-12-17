const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cubeSchema = new Schema({
  cubename: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
  },
  contents: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('Cube', cubeSchema)