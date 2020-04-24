create Database IF NOT EXISTS bamazon;

use bamazon; 

create table PRODUCTS (
ID INT auto_increment,
NAME VARCHAR (20) NOT NULL,
DEPARTMENT_NAME VARCHAR(20) NOT NULL,
PRICE DECIMAL(10, 2) NOT NULL,
QUANTITY INT NOT NULL,
PRIMARY KEY (ID)
);

INSERT INTO PRODUCTS (
NAME,
DEPARTMENT_NAME,
PRICE,
QUANTITY
) VALUES 
("Lysol", "Cleaning", 3.00, 20),
("Band-Aids", "Health", 2.00, 50),
("TV", "Electronics", 400.00, 10),
("Baseball Bat", "Sports", 30.00, 15);


