'use strict';

const express = require('express');
const jwt = require('express-jwt');
const _ = require('lodash');

const router = express.Router();

const { SECRET: secret } = require('../utils/constants');


let cubeContents = [
  { name: "Thoughtseize", type: "Sorcery", layout: "normal", id:"310a1c46-8331-4a09-9fcb-d942f8102364", imgmd:"https://img.scryfall.com/cards/normal/en/ima/110.jpg?1530592140", imgsm:"https://img.scryfall.com/cards/small/en/ima/110.jpg?1530592140"},
  { name: "Preordain", type: "Sorcery", layout: "normal", id:"78d22ece-0cb1-4faf-a871-995449c1a41f", imgmd:"https://img.scryfall.com/cards/normal/en/c15/101.jpg?1532086511", imgsm:"https://img.scryfall.com/cards/small/en/c15/101.jpg?1532086511"},
  { name: "Lightning Bolt", type: "Instant", layout: "normal", id:"e3285e6b-3e79-4d7c-bf96-d920f973b122", imgmd: "https://img.scryfall.com/cards/normal/en/a25/141.jpg?1521727517", imgsm:"https://img.scryfall.com/cards/small/en/a25/141.jpg?1521727517"},
  { name: "Swords to Plowshares", type: "Instant", layout: "normal", id:"6ff9af62-1895-465a-b1f3-61f0d8318958", imgmd:"https://img.scryfall.com/cards/normal/en/bbd/110.jpg?1529061986", imgsm:"https://img.scryfall.com/cards/small/en/bbd/110.jpg?1529061986"},
  { name: "Noble Heirarch", type: "Creature", layout: "normal", id:"ff782973-e33c-4edd-bbd7-5c8dc8d59554", imgmd:"https://img.scryfall.com/cards/normal/front/f/f/ff782973-e33c-4edd-bbd7-5c8dc8d59554.jpg?1541423177", imgsm:"https://img.scryfall.com/cards/small/front/f/f/ff782973-e33c-4edd-bbd7-5c8dc8d59554.jpg?1541423177"},
  { name: "Mox Opal", type: "Artifact", layout: "normal", id:"6b3a20ac-1860-4513-bb73-35d23b088b04", imgmd:"https://img.scryfall.com/cards/normal/en/mm2/223.jpg?1517813031", imgsm:"https://img.scryfall.com/cards/small/en/mm2/223.jpg?1517813031"},
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
    res.json({ data: cubeContents })
  })
  .post((req, res) => {

    const newCard = req.body.newCard
    cubeContents.push(newCard)
    res.status(201).send({
      data: [newCard]
    })
  })

router.route('/:id')
  .delete((req, res) => {
    // the following destructuring example is the same as writing index = req.params.index
    const { id } = req.params
    const updatedCube = cubeContents.map(card => card.id !== id && card).filter(card => card !== false);
    
    cubeContents = updatedCube
    res.status(202).send({
      data: [updatedCube]
    })
  })

exports.router = router;
