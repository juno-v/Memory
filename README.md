# PROJECT SUMMARY
Full-Stack Application that acts as a journaling system. 
Organizes by dates. 
Users are able to search by dates and key words. 
Users are able to upload images from their local computer to their Amazon Web Services S3 Bucket (Cloud) 

#INSTRUCTIONS
Fork/Clone/Download the repo 

1. Open your application for a PostgreSQL database (Postico was used: https://eggerapps.at/postico/)

2. Start your PostgreSQL database

3. Create your PostgreSQL database with this data:

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


CREATE TABLE "entries" (
	"id" SERIAL PRIMARY KEY, 
	"user_id" INT ,
	"title" varchar(80), 
	"date" date , 
	"description" varchar ,
	"location" varchar,
	"url" varchar
);

CREATE TABLE "images" (
	"id" SERIAL PRIMARY KEY, 
	"entries_id" int,
	"file" varchar
);

4. Open your terminal in your create react app file and type the following commands in different windows/tabs:
npm install 
npm run server
npm run client

5. Demo away! 

# Amazon Web Services S3 Buckets Instructions
1. Create an account: https://aws.amazon.com/s3/
2. Create a bucket: https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html
* In your create-react-app *
2. Create a .env file 
3. In the file, have the following: 

bucket_name = yourAWSS3BucketName 
aws_access_key_id = yourAccessKeyID
aws_secret_access_key = yourAWSSecretAccessKey
AWS_Uploaded_File_URL_LINK = https://s3.us-east-2.amazonaws.com/yourBucketName/
SERVER_SESSION_SECRET = aSecretPassword
^ create a strong secret password here: https://passwordsgenerator.net/

4. In your .gitignore file, type *.env to hide your sensitive information


# Technologies used
Database -> PostgreSQL 
Front End -> React, Redux, Material UI 
Back End - Node, Express, PG
Other: Amazon Web Services Buckets 


# EXTRA NOTES FOR AWS
* This application does not utilize uploading images to start due to requiring personal AWS accounts *
* If you'd like to demo the AWS functionality, follow these instructoins for the code to run image upload *

UNCOMMENT the commented out code for AWS functionality.
located in 
-> server/routes/entries.router.js
-> src/components/CreateEntryForm/CreateEntryForm.js

COMMENT THIS CODE OUT for AWS functionality. 
-> server/routes/entries.router.js
comment out line 26-44


