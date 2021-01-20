const inquirer = require("inquirer");
const mysql = require("mysql");

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
                    mainMenu();
                    break;
                case "View Roles":
                    // viewRoles();
                    mainMenu();
                    break;
                default:
                    connection.end();
            }
        });
}

function searchSong() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What song would you like to search up?",
                name: "song",
            },
        ])
        .then(answers => {
            var query = connection.query("SELECT * FROM top5000 WHERE song = ?", answers.song, function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                    // const item = res.find((songInfo) => songInfo.song === answers.song);
                    // console.log(`${item.song}: Position - ${item.position}, Artist - ${item.artist}, Year - ${item.year}`);
                    mainMenu();
                }
            }
            );
        });
}