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
    }).then(function (choice) {
      if (choice.action==="view all Departments"){
        View_Department();
      }
     else if (choice.action === "view all Roles"){
        View_Roles();
      }
      else if (choice.action==="view all Employees"){
        View_Employee();
      }
      else if (choice.action==="Add a department"){
        Add_Department();
      }
      else if (choice.action==="Add a role"){
        Add_Role();
      }
     else  if (choice.action === "Add a employee"){
        Add_Employee();
      }
      else if (choice.action==="Update employee role"){
        Update_Employee();
      }
      else if (choice.action === "Exit") {
        connection.end();
      } 
  })
  
} 
function View_Department() {
  var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        console.log(`DEPARTMENTS:`)
      res.forEach(department => {
          console.log(`ID: ${department.id} | Name: ${department.name}`)
      })
      start();
      });
  };
  function View_Roles() {
    var query = "SELECT * FROM role";
        connection.query(query, function(err, res) {
            console.log(`ROLES:`)
        res.forEach(role => {
            console.log(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.department_id}`);
        })
        start();
        });
    };