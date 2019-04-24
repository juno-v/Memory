const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/upload', async(req, res, next) =>{
  const client = await pool.connect();
  const newEntry = req.body;
  try {
    await client.query('BEGIN')
    const entry = await client.query(`INSERT INTO "entries" ("user_id", "title", "date", "description", "location")
    VALUES ($1, $2, $3, $4, $5) RETURNING id;`, [
      newEntry.user_id,
      newEntry.title,
      newEntry.date,
      newEntry.description,
      newEntry.location,
    ])
    // console.log(entry.rows[0].id)
    const insertPhotoText = `INSERT INTO "images" ("file", "entries_id") VALUES($1,$2);`
    const insertPhotoValues = [newEntry.file, entry.rows[0].id]
    await client.query(insertPhotoText, insertPhotoValues)
    await client.query('COMMIT')
    res.sendStatus(201)
  }catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
  }
})

router.get('/user-entries', (req,res) => {
  const newEntry = req.body;
  const queryText = `SELECT "title", "description", "location", "date" FROM "entries"
                      WHERE "user_id" = $1;`;
  pool.query(queryText, [newEntry.user_id])
    .then((result) => { res.send(result.rows); 
    console.log(`newEntry.user_id`, newEntry.user_id);
    
    })
    .catch((err) => {
      console.log(`Error getting user entries`, err);
      res.sendStatus(500);
    });
})

module.exports = router;
