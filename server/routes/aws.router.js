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
router.post("/", (request, response) => {
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

module.exports = router;

