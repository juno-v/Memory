const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");
require("dotenv").config();

// const pool = require('../modules/pool');

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: process.env.ACCESS,
  secretAccessKey: process.env.SECRET
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: process.env.BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
 console.log(params);
  
  return s3.upload(params).promise();
};

console.log('my bucket is', process.env.BUCKET);

// Define POST route
router.post("/upload", (request, response) => {
  console.log('is this working?');

  
const form = new multiparty.Form();
form.parse(request, async (error, fields, files) => {
  // console.log(files);
  
  if (error) throw new Error(error);
  try {
    const path = files.file[0].path;
    const buffer = fs.readFileSync(path);
    const type = fileType(buffer);
    const timestamp = Date.now().toString();
    // const newFilename = cleanFilename(files.file[0].originalFilename);
    const fileName = `Public/${timestamp}-lg`;
    const data = await uploadFile(buffer, fileName, type);
    return response.status(200).send(data);
  } catch (error) {
      console.log(error);
    return response.status(400).send(error)
    }
  });
});

var params = {
  Bucket: process.env.BUCKET,
  MaxKeys: 10
};


router.get("/bucket", (request, response) => {
  console.log('in aws.router /bucket GET route');

 const objectsArray = s3.listObjects(params, function(err, data) {
     if (err) {
       console.log(err, err.stack);
       response.sendStatus(500);
     }
     // an error occurred
     else {
       console.log('raw data', data.Contents); // successful response

       const siftedArray = data.Contents.map(obj => {
         let params = {Bucket: process.env.BUCKET, Key: obj.Key};
         let url = s3.getSignedUrl(`getObject`, params);
         return {
           key: obj.Key,
           eTag: obj.ETag,
           size: obj.Size,
           storageClass: obj.StorageClass,
           signedURL: url
         } 
       })

       response.send({ siftedArray });
     }
   });
})

module.exports = router;

