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
    FOREIGN KEY (manager_id)
        REFERENCES employees (id)
);

CREATE TABLE roles (
    id INT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(20 , 2 ) NOT NULL,
    department_id INT NOT NULL
);

-- View Employees with everything 
SELECT 
    e.id,
    e.first_name,
    e.last_name,
    r.title,
    d.name AS department,
    r.salary,
    CONCAT(m.first_name, " ", m.last_name) AS manager    
FROM
    employees AS e
        LEFT JOIN
    roles AS r ON e.role_id = r.id
		LEFT JOIN
	departments AS d ON r.department_id = d.id
		LEFT JOIN
	employees AS m ON e.manager_id = m.id
        ORDER BY e.id;

-- View employees by roles
SELECT 
    r.id,
    r.title,
    e.id,
    e.first_name,
    e.last_name,
    CONCAT(m.first_name, " ", m.last_name) AS manager    
FROM
    employees AS e
        LEFT JOIN
    roles AS r ON e.role_id = r.id
		LEFT JOIN
	departments AS d ON r.department_id = d.id
        ORDER BY r.id

-- View Employees by Department
SELECT 
    d.id,
    d.name AS department,
    e.id,
    e.first_name,
    e.last_name    
FROM
    employees AS e
        LEFT JOIN
    roles AS r ON e.role_id = r.id
		LEFT JOIN
	departments AS d ON r.department_id = d.id
        ORDER BY d.id

-- View roles with department
SELECT r.id, r.title, d.name AS department, r.salary FROM roles AS r LEFT JOIN departments AS d ON r.department_id = d.id ORDER BY r.id;

-- Example for showing a table referencing another
SELECT 
    e.first_name,
    e.last_name,
    CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM
    employees AS e
        LEFT JOIN
    employees AS m ON e.manager_id = m.id;



INSERT INTO departments (id, name)
VALUES (1, "accounting"), (2, "factory"), (3, "marketing");

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1,"John","Wick",1,null), (2,"Nancy","Natasha",1,1), (3,"Bob","Builder",2,1), (4,"Anthony","Bourdain",3,3),(5,"Lo","Pook",3,4);

INSERT INTO roles (id, title, salary, department_id)
VALUES (1,"Manager",100000,1),(2,"Accountant",50000,1),(3,"Craftman",40000,2);

