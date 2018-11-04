'use strict';

/**
 * This route handler is supposed to be a boilerplate for authentication.
 * For our purposes at HackerYou, you should treat this handler as a
 * black box. All that is really necessary to understand is that this
 * handler will return a payload with a token in it. We will use this
 * token to access the protected endpoints of our API.
 */

const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { SECRET } = require('../utils/constants');

router.route('/')
  .post((req, res, next) => {

    // Destructure the "body" object out of the incoming request
    const { body } = req;

    // Destructure the username and password from the body payload object
    const { username, password } = body;

    // Check if the username and password are present
    if (username && password) {

      // The user object to return inside the token
      const user = {
        id: 1,
        username,
      };

      const token = jwt.sign(
        {

          // Token expires in 60 seconds
          exp: Math.floor(Date.now() / 1000) + 60,
          data: user,
        },
        SECRET,
      );

      res.json({ data: [ { token } ] });
    } else {

      // Bad username and password
      const error = { message: 'bad.payload.format' };
      const errors = [ error ];

      // Respond with a status code 400 and an object with errors
      res.status(400).json({ errors });
    }
  });

exports.router = router;
