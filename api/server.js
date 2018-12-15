'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/healthcheck', require('./routes/index').router);
app.use('/login', require('./routes/login').router);
app.use('/fulgrens_cube', require('./routes/fulgrens_cube').router);
app.use('/signup', require('./routes/signup').router);
app.use('/login', require('./routes/login').router);
app.use('/users', require('./routes/users').router);
app.use('/cubes', require('./routes/cubes').router);
app.use('/newcube', require('./routes/newcube').router);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    const errors = [
      { message: 'unauthorized' },
    ];

    res.status(401).json({ errors });
  }
});

module.exports = app;
