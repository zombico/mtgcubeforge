'use strict';

const path = require('path')
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/healthcheck', require('./routes/index').router);
app.use('/signup', require('./routes/signup').router);
app.use('/login', require('./routes/login').router);
app.use('/myaccount', require('./routes/myaccount').router);
app.use('/users', require('./routes/users').router);
app.use('/cubes', require('./routes/cubes').router);
app.use('/cubebuilder', require('./routes/cubebuilder').router);
app.use('/', express.static(
  path.join(__dirname, '../build'))
)

// if the user visist a url that we do not have a defined route for, send them to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    const errors = [
      { message: 'unauthorized' },
    ];

    res.status(401).json({ errors });
  }
});

module.exports = app;
