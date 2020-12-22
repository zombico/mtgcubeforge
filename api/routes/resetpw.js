const express = require('express');
const router = express.Router();
const ForgotRequest = require('../models/ForgotRequest');

router.get('/:request_id', async (req, res, next) => {
  const requestId = req.params.request_id
  console.log('id', requestId)
  try {
    const doc = await ForgotRequest.findById(requestId)  
    res.status(200).send({
      data: [doc]
    })
  } catch (e) {  
    next(e)
  }
})

exports.router = router;