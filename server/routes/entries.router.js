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
  console.log(`Hit uploadPost!`);
  console.log(`req.file is: `, req.file);
  console.log(`req.body.title is: `, req.body.title);
  console.log(`req.body.url is : `, req.body.url);
  console.log(`req.body.date is : `, req.body.date);
  console.log(`req.body.location is : `, req.body.location);
  console.log(`req.body.description is : `, req.body.description);
  
  
  let media_key = await uploadToS3(req.file, res);
  uploadToSQL(req, media_key, res);
  res.sendStatus(201);
}

function uploadToS3(file, res) {
  console.log(`Hit uploadToS3!`);
  return new Promise(resolve => {
    
    fs.readFile(file.path)
      .then(data => {
        console.log(`Hit uploadToS3.then!`);
        verbose && console.log(`file read: `, data);
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
  console.log(`hit GET for get /user-entries/:id `);

  const queryText = `SELECT "entries"."title", "entries"."description", "entries"."location", "entries"."date", "entries"."id", "entries"."url", "images"."file" FROM "entries"
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
  console.log(`hit GET for /keyword/:id`);
  console.log(req.params);

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
    .then ((result) => { res.send(result.rows);
      console.log(result.rows);
      

    })
    .catch((err) => {
      console.log(`Error getting entries containing KEYWORD`, err);
      res.sendStatus(500); 
      
    });
})



router.get('/date/:id/:date', (req, res) => {
  console.log(`hit GET for /date/:id`);
  console.log(req.params);
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


router.delete('/:id', (req, res) => {
  console.log(req.params.id);
  console.log(`hit DELETE! `);
  
  const queryText = 'DELETE FROM "entries" WHERE id=$1';
  pool.query(queryText, [req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error deleting entry', err);
      res.sendStatus(500);
    });
});

router.put('/edit/:id', (req, res) => {
  console.log(req.params.id);
  console.log(`req.body is`, req.body);
  const entry = req.body.newEntry;
  console.log(entry.title);
  console.log(entry.date);
  console.log(entry.description);
  console.log(entry.location);
  console.log(entry.url);
  console.log(req.body.entryId);
  

  const queryText = `UPDATE "entries" SET 
                     "title" = $1, "date" = $2, "description" = $3, "location"= $4, "url" = $5
                     WHERE "id" = $6`;
  pool.query(queryText, [entry.title, entry.date, entry.description, entry.location, entry.url, req.body.entryId])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error deleting entry', err);
      res.sendStatus(500);
    });
});

module.exports = router;