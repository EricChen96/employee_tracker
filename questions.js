const questions = {
    mainMenuPrompt: [{
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
    }],
    addDepartmentPrompt: [
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
    ],
    addRolePrompt: [
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
        }
    ],
    addEmployeePrompt:[
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
        }
    ]
};

module.exports = questions;