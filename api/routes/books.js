'use strict';

const express = require('express');
const jwt = require('express-jwt');
const _ = require('lodash');

const router = express.Router();

const { SECRET: secret } = require('../utils/constants');

const books = [
  { id: 1, name: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling' },
  { id: 2, name: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling' },
  { id: 3, name: 'Harry Potter and the Prisoner of Azkaban', author: 'J.K. Rowling' },
  { id: 4, name: 'Harry Potter and the Goblet of Fire', author: 'J.K. Rowling' },
  { id: 5, name: 'Harry Potter and the Order of the Phoenix', author: 'J.K. Rowling' },
  { id: 6, name: 'Harry Potter and the Half-Blood Prince', author: 'J.K. Rowling' },
  { id: 7, name: 'Harry Potter and the Deathly Hallows', author: 'J.K. Rowling' },
];

router.route('/:id')
  .get((req, res, next) => {
    const { params } = req;
    const { id } = params;
    const book = books.filter((b) => b.id === Number(id)).pop();

    if (!book) {
      return res.status(404).send({ data: [] });
    }

    res.json({ data: [ book ] });
  })
  .post(jwt({ secret }), (req, res, next) => {
    const { params, body } = req;
    const { id } = params;
    const { name, author } = body;
    const book = books.filter((b) => b.id === Number(id)).pop();

    if (!book) {
      return res.status(404).send({ data: [] });
    }

    book.name = name || book.name;
    book.author = author || book.author;

    res.json({ data: [ book ] });
  });

router.route('/')
  .get((req, res, next) => {
    res.json({ data: books });
  })
  .post(jwt({ secret }), (req, res, next) => {
    const { body } = req;
    const { name, author } = body;

    const id = Math.max(...books.map((b) => b.id)) + 1;

    const book = {
      id,
      name,
      author,
    };

    books.push(book);
    res.json({ data: [{ id }] });
  });

exports.router = router;
