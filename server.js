const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
    multipleStatements: true, 
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "@Pilote123@",
    database: "employee_db"
  });

  
  connection.connect(function(err) {
    if (err) throw err;
    start();
  });

  // function start
function start() {
  inquirer 
    .prompt({
      name: "action",
      type: "list",
      message: "Choose what you would like to do",
      choice: [
        "view all Departments",
        "view all Roles",
        "view all Employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update employee role",
        "Exit"
      ]  
    }).then(function (ans) {
      

    
  })
  
  
  } 
