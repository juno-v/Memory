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