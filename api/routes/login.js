const express = require('express');
const router = express.Router();
const User = require('../models/User')
const tokenService = require('../utils/tokenService')

router.post('/', async (req, res, next) => {
    
    const { email, password } = req.body;
    
    try {
      const user = await User.findOne({ email })
    
      if (!user) return next(new Error('not found'))
      
      // compare user password against request body password, if they match, match = true, else match = false
      const match = await user.comparePassword(password)
    
      if (match) {
        // generate a token if there is a match
        const token = tokenService.create(user)
    
        res.status(200).send({ token })
      } else {
        next(new Error('unauthorized'))
      }
    } catch(e) {
      next(e)
    }
  });

exports.router = router;