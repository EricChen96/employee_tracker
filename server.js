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
                    "Add Departments",
                    "Add Roles",
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