

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
  
  ALTER TABLE foods RENAME COLUMN  name TO foodName;
-- data nemehdee 
 SELECT * FROM food_delivery.category;
 
--  password solihdoo
 ALTER USER 'root'@'%' IDENTIFIED BY 'P&EsbM700Hp0Wh';
--  zaawal eniig bichne hadgal baiga
--  flush priveleges;
desc foods;
 
-- table hoorond holboh JOIN
SELECT * FROM foods;
INSERT INTO category(id,name,color,v) 
VALUES(7,"Амттан","pink",0);
SELECT * FROM foods f LEFT JOIN category c ON f.category_id = c.id ;
SELECT c.id category_id, c.name category_name, c.color category_color  FROM foods f LEFT JOIN category c ON f.category_id = c.id; 




SELECT * FROM foods;
-- Cascade 
-- DELETE * FROM food_delivery.foods;

CREATE TABLE lesson(
id int not null primary key,
lesson_name varchar(255) NOT NULL,
teacher_id INT,
CONSTRAINT fk_lesson_teacher
FOREIGN KEY (teacher_id) 
REFERENCES teacher(id) 
ON DELETE CASCADE
);

CREATE TABLE teacher(
id int not null primary key,
teacher_name varchar(255) NOT NULL
);

 INSERT INTO teacher(id, teacher_name) 
VALUES(1,"khangaikhuu");
 INSERT INTO teacher(id, teacher_name) 
VALUES(2,"Baynaa");
  INSERT INTO teacher(id, teacher_name) 
VALUES(3,"Miigaa");

 INSERT INTO lesson(id, lesson_name , teacher_id) 
VALUES(3,"ECONOMY", 3);


SELECT * FROM teacher;
SELECT * FROM lesson;
-- cascade hiisner ustgaj bolno
DELETE FROM  teacher where id=1;


-- UPDATE ustgahiin orond update hiine
ALTER TABLE lesson ADD CONSTRAINT fk_update_lesson_teacher
FOREIGN KEY (teacher_id) 
REFERENCES teacher(id) 
ON UPDATE CASCADE;

ALTER TABLE lesson DROP constraint fk_lesson_teacher;
UPDATE teacher SET id =4 WHERE id = 3;
 
  
use classicmodels;
  
--   HAVING 
  select customerNumber, 
  count(customerNumber) as "Customer Number" 
  from orders 
  GROUP BY customerNumber
--   negtged toolj baina 
  HAVING count(customerNumber)>5
  ORDER BY count(customerNumber) DESC;

--   UNION VS JOIN
-- CUSTOMERS -> BAGANA NEMJ BAINA
SELECT CONCAT(contactLastName," ", contactFirstName),"CUSTOMERS" from customers
UNION 
SELECT CONCAT(lastName," ",  firstName), "EMPLOYEES" from employees;

SELECT contactLastName, contactFirstName, "CUSTOMERS" from customers
UNION ALL
SELECT lastName, firstName, "EMPLOYEES" from employees;


  SELECT * from customers;
  SELECT * FROM employees;
  SELECT * FROM offices;
  SELECT * FROM orderdetails;
  SELECT * FROM orders;
  SELECT * FROM payments;
  SELECT * FROM productlines;
  SELECT * FROM products;
  
-- 1. Сан францискогын оффист ажилдаг ажилчдын мэдээллийг гарга
	  SELECT * from offices ;
      SELECT * FROM employees;
      SELECT *
	  FROM employees INNER JOIN offices 
	  ON  employees.officeCode = offices.officeCode WHERE city = "San Francisco";
      
--  2. Америкт нийт хэдэн ажилчин ажиллаж байна вэ
	  SELECT * from offices ;
      SELECT * FROM employees;
  
	  SELECT count(country) , country
	  FROM employees INNER JOIN offices 
	  ON  employees.officeCode = offices.officeCode WHERE country = "USA";
  
  
--  3. Хот бүрээр ажилтны тоог гарга (хамгийн их ажилтантай хот хамгийн бага нь аль 6э)
	 SELECT * from offices ;
     SELECT * FROM employees;
     
	 SELECT count(city) as "Person", city
	 FROM employees INNER JOIN offices 
	 ON  employees.officeCode = offices.officeCode GROUP BY city  ORDER BY Person DESC;

-- 4. Credit Limit хамгийн өндөр хэрэглэгч хэн бэ
	 SELECT * FROM customers;
	 SELECT MAX(creditLimit) as "MAX credit limit" FROM customers; 
  
-- 5. NYC - д байдаг хамгийн өндөр credit limit-тэй хэрэглэгч хэн бэ?
   SELECT * FROM customers;
   SELECT MAX(creditLimit) FROM customers WHERE city = "NYC";
   SELECT * FROM customers WHERE city = "NYC" ORDER BY creditLimit DESC limit 1;
   
   
-- 6. Хамгийн өндөр худалдан авалттай, хамгийн олон худалдан авалттай хэрэглэгчийн мэдээллийг гарга
    SELECT * FROM customers;
    SELECT * FROM payments;
    SELECT * FROM orders;
	 SELECT *
	 FROM payments INNER JOIN customers 
	 ON  payments.customerNumber = customers.customerNumber ORDER BY amount DESC limit 1;
		
	SELECT  count(customerName) ,customerName
	FROM payments INNER JOIN customers 
	ON  payments.customerNumber = customers.customerNumber GROUP BY customerName;
  
  
  
  CREATE TABLE Order_Detail(
id INT not null primary key auto_increment,
food_id INT,
food_price INT,
order_id INT,
foreign key (order_id) references orders(id),
foreign key (food_id) references food(food_id)
);
  
 
alter table food modify column food_id INT  auto_increment;
    
CREATE TABLE orders(
 id INT not null primary key auto_increment,
 customer_id INT,
 deliverman_id INT,
 ordered_date DATE,
 order_status varchar(255),
total_fee DOUBLE,
foreign key (customer_id) references users(id),
foreign key (deliverman_id) references users(id)
);
  
  
  select * from orders;
  select * from users;
  select * from food;
  select * from roles;
  select * from Order_Detail;
  desc orders;
  desc Order_Detail;
  
  
INSERT INTO orders(customer_id,deliverman_id, ordered_date, order_status, total_fee ) 
value(1,1,"2022-08-15", 1, 5000);
  
  
-- orderluu hiiged daraa ni order_detailruu hiine
SET @id = LAST_INSERT_ID();
select @id;
INSERT INTO Order_Detail(food_id, food_price, order_id ) values(1,1800, @id);

-- transaction step
select * from users;

start transaction;
savepoint sp1;
delete from users WHERE id =25;
savepoint sp2;
delete from users WHERE id =24;

-- bugdiin butsaana  
rollback;
-- sp1-g butsaana
rollback to sp1;


-- isolation layer "auto -matar commit hiideg ON-iig OFF bolgodog"
show variables like "autocommit";
set autocommit = off;

-- busdaas yak tursgaarlah we 4 torliin table baidag ehni default ni REPEATABLE-READ baina
show variables like "%isolation%";

