const mongoose = require('mongoose')
const Schema = mongoose.Schema

const forgotRequestSchema = new Schema({  
  email: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('ForgotRequest', forgotRequestSchema)