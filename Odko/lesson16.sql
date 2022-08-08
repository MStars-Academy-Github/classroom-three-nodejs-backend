

use food_delivery;
-- drop database test



CREATE TABLE foods(
_id INT,
discount INT,
sales INT,
category_id INT,
name VARCHAR(255),
price INT,
portion INT,
stock INT,
image VARCHAR(255),
tumb_img VARCHAR(255),
ingredients VARCHAR(255)
);

CREATE TABLE country_unit(
Country_Date INT,
CountryID INT,
Units INT
);

CREATE TABLE countries(
ID INT,
Country VARCHAR(255)
);

-- yag tenstuu baigaa idg awna 
SELECT * FROM country_unit INNER JOIN countries ON countries.ID = country_unit.CountryID;
-- bigdig ni awna
SELECT * FROM country_unit INNER JOIN countries ON countries.ID <> country_unit.CountryID;

insert into countries (ID , Country) values(2,"Canada");
-- baihgui baigaa utga null gargaj ogno 
SELECT * FROM country_unit 	LEFT JOIN countries ON countries.ID = country_unit.CountryID;
-- NULL   gesen utguudig awna
SELECT * FROM country_unit 	LEFT JOIN countries ON countries.ID = country_unit.CountryID WHERE countries.ID IS NULL;



DELETE FROM countries WHERE ID = 1;
-- RIGHT JOIN
SELECT * FROM country_unit 	as cu RIGHT JOIN countries c ON cu.CountryID = c.ID IS NULL;

-- update hiihde


SELECT * FROM country_unit;
SELECT * FROM countries;
INSERT INTO country_unit(Country_Date,Units) 
VALUES("2020-07-02", 97 );
SELECT * FROM foods;
SELECT * FROM category;
ALTER TABLE foods ADD PRIMARY KEY (_id);
ALTER TABLE country_unit MODIFY COLUMN CountryID MEDIUMINT NOT NULL AUTO_INCREMENT;
ALTER TABLE category MODIFY COLUMN id INT;
ALTER TABLE foods ADD FOREIGN KEY (category_id) references category(id);
-- mor ustgahdaa
DELETE FROM table_name WHERE column_name;




INSERT INTO foods( discount , sales, category_id, name, price,portion,stock,image,tumb_img,ingredients) 
VALUES( 0, false, 4, "Самарны нухаш", 8800, 1, 10,  "/food/nut_mash.png","/tumbnails/nut_mash.png", "Самар, улаан лооль, авакадо, бусад ногоо");

INSERT INTO category(name , color , v) VALUES("Салад ба зууш", "orange", 0 );
 SELECT * FROM category;
  SELECT * FROM foods;
-- data nemehdee 
 SELECT * FROM food_delivery.category;
 
--  password solihdoo
 ALTER USER 'root'@'%' IDENTIFIED BY 'P&EsbM700Hp0Wh';
--  zaawal eniig bichne hadgal baiga
--  flush priveleges;

 
-- table hoorond holboh JOIN
SELECT * FROM category;
INSERT INTO category(id,name,color,v) 
VALUES(6,"Үндсэн хоол","green",0);
SELECT * FROM foods f LEFT JOIN category c ON f.category_id = c.id ;
SELECT c.id category_id, c.name category_name, c.color category_color  FROM foods f LEFT JOIN category c ON f.category_id = c.id 
 
 

 
  
  

