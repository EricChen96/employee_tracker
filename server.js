const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_trackerDB",
});
connection.connect((err) => {
    if (err) return console.log(err);
    console.log("connected");
    mainMenu();
});
// function main menu:
function mainMenu() {
    // prompt user choice for post, bid, or exit
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                choices: [
                    // "View All Employees",
                    // "View All Employees by Department",
                    // "View All Employees by Manager",
                    // "Add Employee",
                    // "Remove Employee",
                    // "Update Employee",
                    // "Update Employee Role",
                    "View Departments",
                    "View Roles",
                    "View Employees",
                    "Add Department",
                    "Add Role",
                    "Add Employees",
                    "Update Employee Roles",
                    "EXIT"],
                name: "action",
            },
        ])
        .then(answers => {
            switch (answers.action) {
                case "View Departments":
                    viewDepartments();
                    break;
                case "View Roles":
                    viewRoles();
                    break;
                case "View Employees":
                    viewEmployees();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                default:
                    connection.end();
            }
        });
}

function viewDepartments() {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log("");
            console.table(res);
            mainMenu();
        }
    });
}

function viewRoles() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log("");
            console.table(res);
            mainMenu();
        }
    });
}

function viewEmployees() {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log("");
            console.table(res);
            mainMenu();
        }
    });
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the id of the department?",
                name: "id",
            },
            {
                type: "input",
                message: "What is the name of the new department?",
                name: "name",
            },
        ])
        .then(answers => {
            connection.query(
                "INSERT INTO departments SET ?", 
                answers,
                function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Successfully logged ${answers.department} with ID of ${answers.id}`);
                    mainMenu();
                }
            });
        });
}
let departmentList = [];
function updateDepartmentList() {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) {
            console.log(err);
        } else {
            departmentList = [];
            res.forEach(element => {
                let department = {
                    name: element.id + ". " + element.name,
                    value: element.id
                };
                departmentList.push(department);
            });
        }
    });
}

function addRole() {
    updateDepartmentList();
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the id of the role?",
                name: "id",
            },
            {
                type: "input",
                message: "What is the title of the new role?",
                name: "title",
            },
            {
                type: "input",
                message: "What is the salary of the new role?",
                name: "salary",
            },
            {
                type: "list",
                message: "What is the department ID of the new role?",
                choices: departmentList,
                name: "department_id",
            },
        ])
        .then(answers => {
            connection.query(
                "INSERT INTO roles SET ?", 
                answers,
                function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Successfully logged ${answers.department} with ID of ${answers.id}`);
                    mainMenu();
                }
            });
        });
}
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the id of the employee?",
                name: "id",
            },
            {
                type: "input",
                message: "What is the first name of the employee?",
                name: "first_name",
            },
            {
                type: "input",
                message: "What is the last name of the employee?",
                name: "last_name",
            },
            {
                type: "input",
                message: "What is the salary of the new role?",
                name: "salary",
            },
            {
                type: "list",
                message: "What is the department ID of the new role?",
                choices: departmentList,
                name: "department_id",
            },
        ])
        .then(answers => {
            connection.query(
                "INSERT INTO roles SET ?", 
                answers,
                function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Successfully logged ${answers.department} with ID of ${answers.id}`);
                    mainMenu();
                }
            });
        });
}