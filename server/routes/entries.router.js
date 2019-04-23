const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// add user's journal entry 
router.post('/', (req, res) => {
    console.log(`hit entries.router POST`);
    
    const newEntry = req.body;
    const entryText = `INSERT INTO "entries" ("user_id", "title", "date", "description", "location")
                       VALUES ($1, $2, $3, $4, $5) RETURNING id;`
    const entryValues = [
      newEntry.user_id,
      newEntry.title,
      newEntry.date,
      newEntry.description,
      newEntry.location,
    ];
    const imageText = `INSERT INTO "images" ("file") VALUES($1);`

    const imageValues = [
      newEntry.file
    ];
    pool.query(entryText, entryValues)
    pool.query(imageText, imageValues)
      .then(() => { res.sendStatus(201); })
      .catch((err) => {
        console.log('Error POSTING journal entries into the database', err);
        res.sendStatus(500);
      });
  });

module.exports = router;

/* 
const imageText = `INSERT INTO "images" ("file")
VALUES($1);`

const imageValues = [
  newEntry.file
];
*/