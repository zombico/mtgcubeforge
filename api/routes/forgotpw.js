const express = require('express');
const router = express.Router();
const ForgotRequest = require('../models/ForgotRequest');
const nodemailer = require("nodemailer");

router.delete('/:request_id', async (req, res, next) => {
  const requestId = req.params.request_id
  console.log(requestId)
  try {
    const doc = await ForgotRequest.findByIdAndDelete({ "_id": requestId })
    res.status(200).send({
      data: [doc]
    })
  } catch (e) {  
    next(e)
  }
})


router.post('/', async (req, res, next) => {
    
  const { email } = req.body;
  
  
  try {
    const request = new ForgotRequest({ email })
    const doc = await request.save()
    const resetlink = `https://www.mtgcubeforge.com/reset?${doc._id}`
    res.status(200).send({
      data: 'Request Received'
    })  


    let transporter = nodemailer.createTransport({ 
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      service: 'gmail',
      auth: {
        user: process.env.GMAILUSER,
        pass: process.env.GMAILPASSWORD
      }
    })
    
    let mailOptions = {
      from: 'mtgcubeforge@gmail.com',
      to: email,
      subject: 'Your password reset link',
      text: `${resetlink}`
    }
    
    
    transporter.sendMail(mailOptions, function(err, data) {
      if(err) {
        console.error(err)
      } else {
        console.log('mail sent')
      }
    })
  } catch(e) {
    next(e)
  }
});


exports.router = router;