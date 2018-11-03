'use strict';

const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { SECRET } = require('../utils/constants');

router.route('/')
  .post((req, res, next) => {
    const { body } = req;
    const { username, password } = body;

    if (username && password) {
      const user = {
        id: 1,
        username,
      };

      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60,
          data: user,
        },
        SECRET,
      );

      res.json({ data: [ { token } ] });
    } else {
      const error = { message: 'bad.payload.format' };
      const errors = [ error ];
      res.status(400).json({ errors });
    }
  });

exports.router = router;
