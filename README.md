# PROJECT SUMMARY 
Memory is a full stack application that serves as a journaling system.

# Live Demo Website 
You can demo the application here: https://desolate-reaches-32477.herokuapp.com/#/home <br/>
*this repo does not have Amazon Web Services image upload enabled out of the box* <br/>
*the repo contains the code necessary to do so, scroll down to AWS section for further instructions* <br/>

Username: juno 
Password: juno

# Built with 
React, Redux, Passport, HTML, CSS, PostrgreSQL, Node, Express, Material UI, Amazon Web Services S3 Buckets 
*(see package.json for full list of dependencies)*

# Getting Started
Follow instructions below to spin up a copy of this repo on your local machine

# Prerequisites
Software that is required prior to starting the application

- NPM (https://www.npmjs.com/get-npm)
- Node.js (https://nodejs.org/en/)
- PostgresSQL (https://www.postgresql.org/download/) - choose your system and follow those instructions.
	- Postico was personally used. (https://eggerapps.at/postico/) - A modern PostgreSQL client for mac systems.

# Installing - Get the Development Environment Running
1. Fork/Download/Clone this project
2. Open the terminal in the code folder and type "npm install"
3. Type "npm run server" to start up your server
4. In a different terminal window/tab, type "npm run client" into your terminal to start up your client

# File configurations
1. Create a .env file outside of your folders
2. Visit https://passwordsgenerator.net/ to generate a password.
3. The .env file should have a line that is SERVER_SESSION_SECRET=paste in the password generated here

# Create database
1. Open the application you're using for your PostgreSQL database
2. Create new database named "prime_app"
3. Copy SQL text from the database.sql file 
4. Paste SQL text into Postico and execute statements to create tables and intial user

# The URL to use the app in local development
If npm run client did not open a new browser/tab for you, in your browser URL, insert 
http://localhost:3000/#/home 
to navigate to the home page of this application and begin demo-ing.

# Amazon Web Services S3 Buckets Instructions
- This application does not utilize uploading images to start due to requiring personal AWS accounts <br/>
- If you'd like to demo the AWS functionality, follow these instructoins for the code begin AWS functionality <br/>

1. Create an account: https://aws.amazon.com/s3/
2. Create a bucket: https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html
*In your create-react-app*
3. Create a .env file 
4. In the file, have the following:  <br/>

bucket_name = yourAWSS3BucketName <br/>
aws_access_key_id = yourAccessKeyID <br/>
aws_secret_access_key = yourAWSSecretAccessKey <br/>
AWS_Uploaded_File_URL_LINK = https://s3.us-east-2.amazonaws.com/yourBucketName/ <br/>
SERVER_SESSION_SECRET = aSecretPassword <br/> *skip if you've already completed this in a previous instruction*
^ create a strong secret password here: https://passwordsgenerator.net/ <br/>

5. In your .gitignore file, type *.env to hide your sensitive information

# EXTRA NOTES FOR AWS
- There is code that was commented out for demo-ing without AWS in this repo. 
- Follow the instructions below to enable AWS image uploads. 

UNCOMMENT the commented out code for AWS functionality. <br/>
*located in* <br/> 
- server/routes/entries.router.js
- src/components/CreateEntryForm/CreateEntryForm.js
- src/components/DisplayEntries/DisplayEntries.js
- src/redux/sagas/addEntrySaga.js

COMMENT THIS CODE OUT for AWS functionality. 
- server/routes/entries.router.js <br/>
comment out line 26-44
- src/components/DisplayEntries/DisplayEntries.js <br/>
comment out line 132-133

# Login
- This is a protected application with only one registered user to avoid going over database cap. 
- To log in as the user, use the following credentials:
Username: juno
Password: juno

# Completed features listed below 
- Users can create entries that include the following: <br/>
	- Title
	- Youtube URL (to reference videos if wanted)
	- Date
	- Location (manually typed, no API integration)
	- Description
- Organizes by dates with the 10 most recent entries shown. 
- Users are able to search by dates and key words. 
- Users are able to upload images from their local computer to their Amazon Web Services S3 Bucket (Cloud) 

# Next Steps 
- Debug - last entry to be deleted does not remove from the DOM. Must refresh a few times to see the change. 
- Draft.js - rich text editor. 
- WebSocket or Socket.IO - Try to find a way for continuous data reflect on the DOM. 

