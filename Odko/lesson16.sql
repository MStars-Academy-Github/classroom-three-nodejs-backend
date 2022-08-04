

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



SELECT * FROM foods;
SELECT * FROM category;
ALTER TABLE foods ADD PRIMARY KEY (_id);
ALTER TABLE foods MODIFY COLUMN _id MEDIUMINT NOT NULL AUTO_INCREMENT;
ALTER TABLE category MODIFY COLUMN id INT;
ALTER TABLE foods ADD FOREIGN KEY (category_id) references category(id);




INSERT INTO foods( discount , sales, category_id, name, price,portion,stock,image,tumb_img,ingredients) 
VALUES( 0, false, 4, "Чикен рамен", 9800, 1, 10,  "/food/chicken_ramen.png", "3_tumb.png", "Тахианы гуяны мах, будааны гоймон, тахианы шөл" );

INSERT INTO category(name , color , v) VALUES("Салад ба зууш", "orange", 0 );
 SELECT * FROM category;
-- data nemehdee 
 SELECT * FROM food_delivery.category;
 
--  password solihdoo
 ALTER USER 'root'@'%' IDENTIFIED BY 'P&EsbM700Hp0Wh'
--  zaawal eniig bichne hadgal baiga
--  flush priveleges;

 
 
  


 
  
  

