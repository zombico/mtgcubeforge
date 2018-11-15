'use strict';

const express = require('express');
const jwt = require('express-jwt');
const _ = require('lodash');

const router = express.Router();

const { SECRET: secret } = require('../utils/constants');


const cubeContents = [
  { name: "Thoughtseize", type: "Sorcery", layout: "normal", imgmd:"https://img.scryfall.com/cards/normal/en/ima/110.jpg?1530592140", imgsm:"https://img.scryfall.com/cards/small/en/ima/110.jpg?1530592140"},
  { name: "Preordain", type: "Sorcery", layout: "normal", imgmd:"https://img.scryfall.com/cards/normal/en/c15/101.jpg?1532086511", imgsm:"https://img.scryfall.com/cards/small/en/c15/101.jpg?1532086511"},
  { name: "Lightning Bolt", type: "Instant", layout: "normal", imgmd: "https://img.scryfall.com/cards/normal/en/a25/141.jpg?1521727517", imgsm:"https://img.scryfall.com/cards/small/en/a25/141.jpg?1521727517"},
  { name: "Swords to Plowshares", type: "Instant", layout: "normal", imgmd:"https://img.scryfall.com/cards/normal/en/bbd/110.jpg?1529061986", imgsm:"https://img.scryfall.com/cards/small/en/bbd/110.jpg?1529061986"},
  { name: "Noble Heirarch", type: "Creature", layout: "normal", imgmd:"https://img.scryfall.com/cards/normal/front/f/f/ff782973-e33c-4edd-bbd7-5c8dc8d59554.jpg?1541423177", imgsm:"https://img.scryfall.com/cards/small/front/f/f/ff782973-e33c-4edd-bbd7-5c8dc8d59554.jpg?1541423177"},
  { name: "Mox Opal", type: "Artifact", layout: "normal", imgmd:"https://img.scryfall.com/cards/normal/en/mm2/223.jpg?1517813031", imgsm:"https://img.scryfall.com/cards/small/en/mm2/223.jpg?1517813031"},
]

// router.route('/:id')
//   .get((req, res, next) => {
//     const { params } = req;
//     const { id } = params;
//     const book = books.filter((b) => b.id === Number(id)).pop();

//     if (!book) {
//       return res.status(404).send({ data: [] });
//     }

//     res.json({ data: [ book ] });
//   })
//   .post(jwt({ secret }), (req, res, next) => {
//     const { params, body } = req;
//     const { id } = params;
//     const { name, author } = body;
//     const book = books.filter((b) => b.id === Number(id)).pop();

//     if (!book) {
//       return res.status(404).send({ data: [] });
//     }

//     book.name = name || book.name;
//     book.author = author || book.author;

//     res.json({ data: [ book ] });
//   });

router.route('/')
  .get((req, res, next) => {
    res.json({ data: cubeContents });
  })
  .post(jwt({ secret }), (req, res, next) => {
    const { body } = req;
    const { name, author } = body;

    const id = Math.max(...cubeContents.map((b) => b.id)) + 1;

    const card = {
      id,
      name,
      imgmd,
      imgsm
    };

    cubeContents.push(card);
    res.json({ data: [{ id }] });
  });

exports.router = router;
