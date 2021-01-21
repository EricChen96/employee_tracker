DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;
USE employee_trackerDB;

CREATE TABLE departments (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE employees (
    id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    foreign key (manager_id) REFERENCES employees(id)
);

CREATE TABLE roles (
    id INT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(20 , 2 ) NOT NULL,
    department_id INT NOT NULL
);

SELECT e.first_name, e.last_name, CONCAT(m.first_name," ", m.last_name) AS manager FROM employees AS e LEFT JOIN employees AS m ON
e.manager_id = m.id;

INSERT INTO departments (id, name)
VALUES (1, "accounting"), (2, "factory"), (3, "marketing");

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1,"John","Wick",1,null), (2,"Nancy","Natasha",1,1), (3,"Bob","Builder",2,1), (4,"Anthony","Bourdain",3,3),(5,"Lo","Pook",3,4);

INSERT INTO roles (id, title, salary, department_id)
VALUES (1,"Manager",100000,1),(2,"Accountant",50000,1),(3,"Craftman",40000,2);

