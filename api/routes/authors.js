'use strict';

const express = require('express');
const jwt = require('express-jwt');
const _ = require('lodash');

const router = express.Router();

const { SECRET: secret } = require('../utils/constants');

const authors = [
  { id: 1, name: 'J.K. Rowling' },
  { id: 2, name: 'Ryan Christiani' },
  { id: 3, name: 'Malala Yousafzai' },
];

router.route('/:id')
  .get((req, res, next) => {
    const { params } = req;
    const { id } = params;
    const author = authors.filter((a) => a.id === Number(id)).pop();

    if (!author) {
      return res.status(404).send({ data: [] });
    }

    res.json({ data: [ author ] });
  });

router.route('/')
  .get((req, res, next) => {    
    res.json({ data: authors });
  })
  .post(jwt({ secret }), (req, res, next) => {
    const { body } = req;
    const { name } = body;

    const id = Math.max(...authors.map((a) => a.id)) + 1;

    const author = {
      id,
      name,
    };

    authors.push(author);
    res.json({ data: [{ id }] });
  });


exports.router = router;
