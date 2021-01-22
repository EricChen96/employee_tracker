const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");

let departmentList = [];
let roleList = [];
let employeeList = [];

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
    updateDepartmentList();
    updateRoleList();
    updateEmployeeList();
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "View Departments",
                    "View Roles",
                    "View Employees",
                    "View Employees By Roles",
                    "View Employees By Departments",
                    "View Employees By Managers",
                    "Add Department",
                    "Add Role",
                    "Add Employee",
                    "Update Department",
                    "Update Employee Roles",
                    "Update Employee",
                    "Delete Department",
                    "Delete Role",
                    "Delete Employee",
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
                case "View Employees By Roles":
                    viewEmployeesByRoles();
                    break;
                case "View Employees By Departments":
                    viewEmployeesByDepartments();
                    break;
                case "View Employees By Managers":
                    viewEmployeesByManagers();
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
                case "Update Department":
                    updateDepartment();
                    break;
                case "Update Employee Roles":
                    updateEmployeeRoles();
                    break;
                case "Update Employee":
                    updateEmployee();
                    break;
                case "Delete Department":
                    deleteDepartment();
                    break;
                case "Delete Role":
                    deleteRole();
                    break;
                case "Delete Employee":
                    deleteEmployee();
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
        }
        mainMenu();
    });
}

function viewRoles() {
    connection.query(`SELECT r.id, r.title, d.name AS department, r.salary FROM roles AS r LEFT JOIN departments AS d ON r.department_id = d.id ORDER BY r.id;`, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log("");
            console.table(res);
        }
        mainMenu();
    });
}
// SELECT e.first_name, e.last_name, CONCAT(m.first_name," ", m.last_name) AS manager FROM employees AS e 
// LEFT JOIN employees AS m ON e.manager_id = m.id;
function viewEmployees() {
    connection.query(`SELECT e.id AS e_id,
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
        ORDER BY e.id`, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log("");
            console.table(res);
        }
        mainMenu();
    });
}

function viewEmployeesByRoles() {
    connection.query(`SELECT 
    e.role_id AS r_id,
    r.title,
    e.id AS e_id,
    e.first_name,
    e.last_name
FROM
    employees AS e
        LEFT JOIN
    roles AS r ON e.role_id = r.id
        ORDER BY e.role_id`, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log("");
            console.table(res);
        }
        mainMenu();
    });
}
function viewEmployeesByDepartments() {
    connection.query(`SELECT 
    r.department_id AS d_id,
    d.name AS departments,
    e.id AS e_id,
    e.first_name,
    e.last_name    
FROM
    employees AS e
        LEFT JOIN
    roles AS r ON e.role_id = r.id
		LEFT JOIN
	departments AS d ON r.department_id = d.id
        ORDER BY r.department_id`, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log("");
            console.table(res);
        }
        mainMenu();
    });
}

function viewEmployeesByManagers() {
    connection.query(`SELECT 
    e.manager_id AS m_id,
    CONCAT(m.first_name, " ", m.last_name) AS manager,
    e.id AS e_id,
    e.first_name,
    e.last_name
FROM
    employees AS e
        LEFT JOIN
    employees AS m ON e.manager_id = m.id
        ORDER BY e.manager_id`, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log("");
            console.table(res);
        }
        mainMenu();
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
                    }
                    mainMenu();
                });
        });
}


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

function updateRoleList() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) {
            console.log(err);
        } else {
            roleList = [];
            res.forEach(element => {
                let role = {
                    name: `${element.id}. ${element.title} - Salary: $${element.salary} - Department ID: ${element.department_id}`,
                    value: element.id
                };
                roleList.push(role);
            });
        }
    });
}
function updateEmployeeList() {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) {
            console.log(err);
        } else {
            employeeList = [];
            res.forEach(element => {
                let employee = {
                    name: `${element.id}. ${element.first_name} ${element.last_name} - Role ID: ${element.role_id} - Manager ID: ${element.manager_id}`,
                    value: element.id
                };
                employeeList.push(employee);
            });
        }
    });
}

// function updateManagerList() {
//     connection.query("SELECT * FROM managers", function (err, res) {
//         if (err) {
//             console.log(err);
//         } else {
//             managerList = [];
//             if (res.length < 1) {
//                 let manager = {
//                     name: "No Manager",
//                     value: null
//                 };
//                 managerList.push(manager);
//             }
//             else {
//                 res.forEach(element => {
//                     let manager = {
//                         name: `${element.id}. ${element.first_name} ${element.last_name}`,
//                         value: element.id
//                     };
//                     managerList.push(manager);
//                 });
//             }
//         }
//     });
// }

function addRole() {
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
                    }
                    mainMenu();
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
                type: "list",
                message: "What is the role of the employee?",
                choices: roleList,
                name: "role_id",
            },
            {
                type: "list",
                message: "What is the employee ID for the manager of the employee?",
                choices: addNullManagerOption(employeeList),
                name: "manager_id",
            },
        ])
        .then(answers => {
            connection.query(
                "INSERT INTO employees SET ?",
                answers,
                function (err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Successfully logged ${answers.department} with ID of ${answers.id}`);
                    }
                    mainMenu();
                });
        });
}

function addNullManagerOption(array) {
    let noManager = {
        name: "No Manager",
        value: null
    };
    array.push(noManager);
    return array;
}

function updateEmployee() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee ID do you want to update?",
                choices: employeeList,
                name: "updatedEmployeeID",
            },
            {
                type: "input",
                message: "What is the UPDATED ID of the employee?",
                name: "id",
            },
            {
                type: "input",
                message: "What is the UPDATED first name of the employee?",
                name: "first_name",
            },
            {
                type: "input",
                message: "What is the UPDATED last name of the employee?",
                name: "last_name",
            },
            {
                type: "list",
                message: "What is the UPDATED role ID of the employee?",
                choices: roleList,
                name: "role_id",
            },
            {
                type: "list",
                message: "What is the UPDATED manager ID of the employee?",
                choices: addNullManagerOption(employeeList),
                name: "manager_id",
            },
        ])
        .then(answers => {
            let updatedEmployee = {
                id: answers.id,
                first_name: answers.first_name,
                last_name: answers.last_name,
                role_id: answers.role_id,
                manager_id: answers.manager_id
            };
            connection.query(
                "UPDATE employees SET ? WHERE id = ?",
                [updatedEmployee, answers.updatedEmployeeID],
                function (err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Successfully updated to ${answers.id}. ${answers.first_name} ${answers.last_name} - Role ID: ${answers.role_id} - Manager ID: ${answers.manager_id}`);
                    }
                    mainMenu();
                });
        });
}
function updateEmployeeRoles() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which role do you want to update?",
                choices: roleList,
                name: "updatedRoleID",
            },
            {
                type: "input",
                message: "What is the UPDATED ID of the role?",
                name: "id",
            },
            {
                type: "input",
                message: "What is the UPDATED title of the role?",
                name: "title",
            },
            {
                type: "input",
                message: "What is the UPDATED salary of the role?",
                name: "salary",
            },
            {
                type: "list",
                message: "What is the UPDATED department ID of the role?",
                choices: departmentList,
                name: "department_id",
            },
        ])
        .then(answers => {
            let updatedRole = {
                id: answers.id,
                title: answers.title,
                salary: answers.salary,
                department_id: answers.department_id
            };
            connection.query(
                "UPDATE roles SET ? WHERE id = ?",
                [updatedRole, answers.updatedRoleID],
                function (err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Successfully updated to ${answers.id}. ${answers.title}`);
                    }
                    mainMenu();
                });
        });
}

function updateDepartment() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which department do you want to update?",
                choices: departmentList,
                name: "updatedDepartmentID",
            },
            {
                type: "input",
                message: "What is the UPDATED ID of the department?",
                name: "id",
            },
            {
                type: "input",
                message: "What is the UPDATED name of the derpartment?",
                name: "name",
            },
        ])
        .then(answers => {
            let updatedDepartment = {
                id: answers.id,
                name: answers.name
            };
            connection.query(
                "UPDATE departments SET ? WHERE id = ?",
                [updatedDepartment, answers.updatedDepartmentID],
                function (err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Successfully updated to ${answers.id}. ${answers.name}`);
                    }
                    mainMenu();
                });
        });
}

function deleteDepartment() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which department do you want to delete?",
                choices: departmentList,
                name: "deletedDepartmentID",
            }
        ])
        .then(answers => {
            connection.query(
                "DELETE FROM departments WHERE id = ?",
                [answers.deletedDepartmentID],
                function (err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Successfully deleted`);
                    }
                    mainMenu();
                });
        });
}

function deleteRole() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which role do you want to delete?",
                choices: roleList,
                name: "deletedRoleID",
            }
        ])
        .then(answers => {
            connection.query(
                "DELETE FROM roles WHERE id = ?",
                [answers.deletedRoleID],
                function (err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Successfully deleted`);
                    }
                    mainMenu();
                });
        });
}

function deleteEmployee() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee do you want to delete?",
                choices: employeeList,
                name: "deletedEmployeeID",
            }
        ])
        .then(answers => {
            connection.query(
                "DELETE FROM employees WHERE id = ?",
                [answers.deletedEmployeeID],
                function (err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Successfully deleted`);
                    }
                    mainMenu();
                });
        });
}