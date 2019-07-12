const express = require('express');
const router = express.Router();

const multer  = require('multer');
const multerDest ='../uploads';
const upload = multer({ dest: multerDest });

const pool = require('../modules/pool');
const fs    = require('fs-extra');
const AWS   = require('aws-sdk');

const BUCKET_NAME     = process.env.bucket_name;
const IAM_USER_KEY    = process.env.aws_access_key_id;
const IAM_USER_SECRET = process.env.aws_secret_access_key;
 
const verbose = false; //turns on and off console.logs

router.post('/upload-form', upload.single('file'), async(req, res) => {
  uploadPost(req, res);
});

const uploadPost = async (req, res) => {
  let media_key = await uploadToS3(req.file, res);
  uploadToSQL(req, media_key, res);
  res.sendStatus(201);
}

function uploadToS3(file, res) {
  return new Promise(resolve => {
    
    fs.readFile(file.path)
      .then(data => {
        verbose
        let s3bucket = new AWS.S3({
          accessKeyId: IAM_USER_KEY,
          secretAccessKey: IAM_USER_SECRET,
          Bucket: BUCKET_NAME,
          signatureVersion: 'v4',
          region: 'us-east-2',
        });
        s3bucket.createBucket(function () {
          const params = {
            Bucket: BUCKET_NAME,
            Key: file.filename,
            Body: data,
          };
          s3bucket.upload(params, function (error, data) {
            if (error) {
              res.sendStatus(500);
            }
            resolve(data.Key);
          })
        })
      })
      .catch(error => {
      res.sendStatus(500);
    })
  })
}

  const uploadToSQL = async(req, media_key, res) => {
    const newEntry = req.body;
    const client = await pool.connect();
    try {
      await client.query('BEGIN')
      const entry = await client.query(`INSERT INTO "entries" ("user_id", "title", "date", "description", "location", "url")
                                      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`, [
        newEntry.user_id,
        newEntry.title,
        newEntry.date,
        newEntry.description,
        newEntry.location,
        newEntry.url,
      ])
      const insertPhotoText = `INSERT INTO "images" ("file", "entries_id") VALUES($1,$2);`
      const insertPhotoValues = [media_key, entry.rows[0].id]
      await client.query(insertPhotoText, insertPhotoValues)
      await client.query('COMMIT')
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release();
    }
}

router.get('/user-entries/:id', (req,res) => {
  const id = req.params.id;

  const queryText = `SELECT "entries"."title", "entries"."description", "entries"."location", 
                      "entries"."date", "entries"."id", "entries"."url", "images"."file" FROM "entries"
                      JOIN "images" ON "images"."entries_id" = "entries"."id"
                      WHERE "entries"."user_id" = $1
                      ORDER BY "entries"."date" DESC limit 5;`;
  pool.query(queryText, [id])
    .then((result) => { res.send(result.rows); 

    })
    .catch((err) => {
      console.log(`Error getting user entries`, err);
      res.sendStatus(500);
    });
})

router.get('/keyword/:id/:keyword', (req, res) => {
  const id = req.params.id; 
  const keyword = req.params.keyword; 
  
  const queryText =   `SELECT * FROM "entries"
                      JOIN "images" ON "images"."entries_id" = "entries"."id"
                      WHERE "user_id" = ${id}
                      AND (
                      "description" LIKE '%${keyword}%' OR "description" ILIKE '%${keyword}%' OR
                      "title" LIKE '%${keyword}%' OR "title" ILIKE '%${keyword}%' OR
                      "location" LIKE '%${keyword}%' OR "location" ILIKE '%${keyword}%' OR
                      "url" LIKE '%${keyword}%' OR "url" ILIKE '%${keyword}%')`;
  pool.query(queryText)
    .then ((result) => { 
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error getting entries containing KEYWORD`, err);
      res.sendStatus(500); 
    });
})


router.get('/date/:id/:date', (req, res) => {
  const id = req.params.id; 
  const date = req.params.date; 
  
  const queryText =   `SELECT * FROM "entries"
                        JOIN "images" ON "images"."entries_id" = "entries"."id"
                        WHERE "user_id" = ${id}
                        AND (
                        "entries"."date" = '${date}');`;
  pool.query(queryText)
    .then ((result) => { res.send(result.rows);
      console.log(result.rows);
    })
    .catch((err) => {
      console.log(`Error getting entries containing DATE`, err);
      res.sendStatus(500); 
    });
})


router.delete('/:id', async(req, res) => {
  const client = await pool.connect();

  try { 
    await client.query('BEGIN')
    await client.query(`DELETE  FROM entries 
                        WHERE id = $1;`,[req.params.id]);
    await client.query(`DELETE  FROM images 
                        WHERE entries_id = $1;`,[req.params.id]);
    await client.query('COMMIT')
  }
  catch (error) {
    await client.query('ROLLBACK')
    throw error
  }
  finally {
    client.release(); 
    res.sendStatus(200);
  }
});

router.put('/edit/:id', (req, res) => {
  const queryText = `UPDATE "entries" SET 
                     "title" = $1, "date" = $2, "description" = $3, "location"= $4, "url" = $5
                     WHERE "id" = $6`;
  pool.query(queryText, [entry.title, entry.date, entry.description, entry.location, entry.url, req.body.entryId])
    .then(() => { 
      res.sendStatus(200); 
    })
    .catch((err) => {
      console.log('Error deleting entry', err);
      res.sendStatus(500);
    });
});

module.exports = router;