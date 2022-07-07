-- Don't forget to add your create table SQL 
CREATE TABLE shopping_list (
	id SERIAL PRIMARY KEY,
	"name" varchar(80) NOT NULL,
    "quantity" decimal (10,2) NOT NULL,
    "unit" varchar(20)
);


-- It is also helpful to include some test data
INSERT INTO "shopping_list" ("name","quantity","unit") VALUES ('Tomatoes', 3, 'each'), ('Cucumber', 4, 'each');