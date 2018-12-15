const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: { 
    type: String, 
    required: true,
    unique: true
  },
  password: { 
    type: String, 
    required: true 
  }
})

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password') || user.isNew) {
    try {
      const hash = await bcrypt.hash(user.password, 10)
      user.password = hash
      next()
    } catch (e) {
      next(e)
    }
  }
  next()
})

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

module.exports = model('User', userSchema)
