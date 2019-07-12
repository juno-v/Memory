# PROJECT SUMMARY 
Memory is a full stack application that serves as a journaling system.

# Live Demo Website 
You can demo the application here: https://desolate-reaches-32477.herokuapp.com/#/home <br/>
Username: juno <br/>
Password: juno
<br/>
- *the live demo (Heroku) does not have Amazon Web Services image upload due to requiring integration of personal AWS accounts* 
- *this Github REPO contains the code necessary to do so in local development, scroll down to AWS section for further instructions* 

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
- An Amazon Web Services Account and S3 Bucket 

# Installing - Get the Development Environment Running
1. Fork/Download/Clone this project
2. Open the terminal in the code folder and type "npm install"
3. Type "npm run server" to start up your server
4. In a different terminal window/tab, type "npm run client" into your terminal to start up your client

# Create database
1. Open the application you're using for your PostgreSQL database
2. Create new database named "prime_app"
3. Copy SQL text from the database.sql file 
4. Paste SQL text into Postico and execute statements to create tables and intial user

# The URL to use the app in local development
If npm run client did not open a new browser/tab for you, in your browser URL, insert 
http://localhost:3000/#/home 
to navigate to the home page of this application and begin demoing. 

# Amazon Web Services S3 Buckets + .env file Instructions 
1. Create an Amazon Web Services account here: https://aws.amazon.com/s3/ <br/>
*Amazon requires credit card information, but you will not be charged if you stay under the free tier data upload*
2. Create a bucket: https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html
<br/>
*In your create-react-app*
3. Create a .env file 
4. In the file, have the following:  <br/>

bucket_name = yourS3BucketName <br/>
aws_access_key_id = yourAccessKeyID <br/>
aws_secret_access_key = yourAWSSecretAccessKey <br/>
AWS_Uploaded_File_URL_LINK = https://s3.us-east-2.amazonaws.com/yourBucketName/ <br/>
SERVER_SESSION_SECRET = aSecretPassword <br/> 
^ create a strong secret password here: https://passwordsgenerator.net/ <br/>

5. In your .gitignore file, type *.env to hide your sensitive information


# Login - Begin demo in local development! 
- To log in as the user, use the following credentials:
<br/>
Username: juno <br/>
Password: juno

# Completed features listed below 
- Multiple users are able to be registered
- Users can create entries that include the following: <br/>
	- Title
	- A Website URL 
	- Date
	- Location (manually typed, no API integration)
	- Description
- Organizes by dates with the 10 most recent entries shown. 
- Users are able to search by dates and key words. 
- Users are able to upload images from their local computer to their Amazon Web Services S3 Bucket (Cloud) 

# Notes for employers 
- What was exciting about this project? 
	- Utilizing an unfamiliar at the time: _Amazon Web Services S3 Buckets_. At Prime Digital Academy (https://primeacademy.io/) , I sat next to other students who were also using AWS services for their solo projects. We called ourselves,”The Corner Office”. I struggled as an individual, and we struggled as a group, trying to find resources to help us implement AWS into our projects. At the end of the two weeks project time we were given, the Corner Office successfully utilized AWS. This success came from communication, pair programming, and most of all, support for each other! The functionality of local files being uploaded into a private account on the cloud is awesome. I wouldn’t have been able to do this without my team. Thank you to the Corner Office and my instructors! 

- Personal touches that were added 
	- Material UI was implimented for a standard design feel.
		- Material UI tabs were used to create a fast and simple experience for users. 
	- All components for logged in users display on one endpoint (@/#/home) and then conditionally rendered within components. Did not feel the need to have more endpoints for a simple application with two tabs. 
	- Continued working on the completion of the project even after graduating. 
		- Project was completed June 6th 2019, check latest commits for added features
		- Some added features: 
		- Created a branch that doesn't utilize image uploads and deployed onto Heroku for live demo. 
		- Users are able to delete from multiple tables. (SQL Transactions)
# Next Steps 
- Use Draft.js as rich text editor for journal descriptions. 
- Use WebSocket or Socket.IO to try and find a way for continuous data reflection on the DOM. 
- Continue cleaning up the code and re componentize for better organization. 
- Convert all css styles to follow a CSS pattern. SCSS, BEM, etc. 
