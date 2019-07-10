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

/* create initial user  */
INSERT INTO "user" ("username", "password") VALUES ('juno', '$2b$10$w8MoBsBuDhONIgZgIXtXZe/hJRFz6A7J11kNN52ppuN/5THT7ZzQu');