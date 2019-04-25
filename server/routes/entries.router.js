const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/upload-form', async(req, res, next) =>{
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


router.get('/user-entries/:id', (req,res) => {
  const id = req.params.id;
  console.log(`hit GET for get entries `);

  const queryText = `SELECT "title", "description", "location", "date", "id" FROM "entries"
                      WHERE "user_id" = $1;`;
  pool.query(queryText, [id])
    .then((result) => { res.send(result.rows); 

    })
    .catch((err) => {
      console.log(`Error getting user entries`, err);
      res.sendStatus(500);
    });
})

router.delete('/:id', (req, res) => {
  console.log(req.params.id);
  const queryText = 'DELETE FROM "entries" WHERE id=$1';
  pool.query(queryText, [req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error deleting entry', err);
      res.sendStatus(500);
    });
});


module.exports = router;