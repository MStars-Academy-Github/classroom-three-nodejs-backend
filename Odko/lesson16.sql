CREATE DATABASE testUpdate;

use testUpdate;
-- drop database test

CREATE TABLE testUpdate(
Names VARCHAR(255),
Age INT,
Email VARCHAR(255)
);

-- column add
ALTER TABLE testUpdate ADD register VARCHAR(10);
-- column delete
ALTER TABLE testUpdate DROP COLUMN Age;
-- column type update
ALTER TABLE testUpdate MODIFY COLUMN Email VARCHAR(255);
-- column name update
ALTER TABLE testUpdate RENAME COLUMN Email TO userID;
-- table name update  
ALTER TABLE testUpdate RENAME  TO testLesson;



CREATE DATABASE Library;
use Library;

 CREATE TABLE book(
		isbn INT,
      title VARCHAR(255),
      subtitle VARCHAR(255),
      author VARCHAR(255),
      published INT,
      publisher VARCHAR(255),
      pages INT,
      book_description VARCHAR(255),
      website VARCHAR(255)
 );
 ALTER TABLE book RENAME COLUMN description TO book_description;
 ALTER TABLE book MODIFY COLUMN isbn BIGINT;
 INSERT INTO book(isbn,title, subtitle, author, published, publisher,pages, book_description, website) 
 VALUES(9781484200766,  "Pro Git","Everything you neeed to know about Git","Scott Chacon and Ben Straub","2014-11-18T00:00:00.000Z",
 "Apress; 2nd edition",
      458,"Pro Git (Second Edition) is your fully-updated 
      guide to Git and its usage in the modern world. Git has come a long way 
      since it was first developed by Linus Torvalds for Linux kernel development. It 
      has taken the open source world by storm since its inception in 2005, and this book t
      eaches you how to use it like a pro.","https://git-scm.com/book/en/v2");


 
 SELECT * FROM book;
 ALTER TABLE book MODIFY COLUMN book_description VARCHAR(1000);
  SELECT * FROM book;
  SELECT * FROM book WHERE publisher <> "No Starch Press";
  SELECT * FROM book WHERE publisher = "No Starch Press";
  SELECT * FROM book WHERE pages <= 400 and publisher = "OReilly Media";
  SELECT * FROM book WHERE  publisher = "OReilly Media" or publisher = "No Starch Press";
--   javascript ugnees hoish
  SELECT * FROM book WHERE  book_description  LIKE "JavaScript%" ;
  
--   PRIMARY KEY
  use testUpdate;
  CREATE TABLE Persons(
 --  dawtagdajhgui ID 
  ID int NOT NUll,
  LastName VARCHAR(255) NOT NULL,
  FirstName VARCHAR(255),
  Age INT,
  PRIMARY KEY (ID)
  );
  
INSERT INTO Persons(ID,LastName,FirstName,Age) 
VALUES(1, "Test", "TestTest",23);
   
INSERT INTO Persons values( 5,"Test5", "TestTeeest5",25);

  
 SELECT * FROM Persons;
 ALTER TABLE Persons MODIFY COLUMN ID MEDIUMINT NOT NULL AUTO_INCREMENT;
 use Library;
 SELECT * FROM book;
 DELETE FROM book WHERE title = 9781593279509;
 
 
 -- UNIQUE ADD 
ALTER TABLE book
ADD UNIQUE(isbn);

-- UNIQUE DELETE 
ALTER TABLE book
DROP CONSTRAINT isbn;

-- ehni 4 column
 SELECT * FROM book LIMIT 4;


 
  
  

