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
    manager_id INT
);

CREATE TABLE roles (
    id INT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(20 , 2 ) NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE managers (
    id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL
);

INSERT INTO managers (id, first_name, last_name)
VALUES (1, "John", "Wick");

INSERT INTO departments (id, name)
VALUES (1, "accounting"), (2, "factory"), (3, "marketing");

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1,"John","Wick",1,1), (2,"Nancy","Natasha",1,2), (3,"Bob","Builder",2,2), (4,"Anthony","Bourdain",3,3),(5,"Lo","Pook",3,4);

INSERT INTO roles (id, title, salary, department_id)
VALUES (1,"Manager",100000,1),(2,"Accountant",50000,1),(3,"Craftman",40000,2);
