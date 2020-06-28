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


connection.connect(function (err) {
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
      // if choice is verified then it will run the function specified
    }).then(function (choice) {
      if (choice.action === "view all Departments") {
        View_Department();
      }
      else if (choice.action === "view all Roles") {
        View_Roles();
      }
      else if (choice.action === "view all Employees") {
        View_Employee();
      }
      else if (choice.action === "Add a department") {
        Add_Department();
      }
      else if (choice.action === "Add a role") {
        Add_Role();
      }
      else if (choice.action === "Add a employee") {
        Add_Employee();
      }
      else if (choice.action === "Update employee role") {
        Update_Employee();
      }
      else if (choice.action === "Exit") {
        connection.end();
      }
    })

}
function View_Department() {
  // create var query to hold the Request
  var query = "SELECT * FROM department";

  connection.query(query, function (err, res) {
    console.log(`DEPARTMENTS:`)
    res.forEach(department => {
      console.log(`ID: ${department.id} | Name: ${department.name}`)
    })
    start();
  });
};
function View_Roles() {
  // create var query to hold the Request
  var query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    console.log(`ROLES:`)
    res.forEach(role => {
      console.log(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.department_id}`);
    })
    start();
  });
};
function View_Employee() {
  // create var query to hold the Request
  var query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    console.log(`EMPLOYEES:`)
    res.forEach(employee => {
      console.log(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role ID: ${employee.role_id} | Manager ID: ${employee.manager_id}`);
    })
    start();
  });
};

function Add_Department() {
  inquirer
    //promt for user Input 
    .prompt({
      name: "department",
      type: "input",
      message: "What is the name of the new department?",
    })
    .then(function (answer) {
      var query = "INSERT INTO department (name) VALUES ( ? )";
      connection.query(query, answer.department, function (err, res) {
        console.log(`You have added this department: ${(answer.department).toUpperCase()}.`)
      })
      viewDepartments();
    })
}

function Add_Role() {

  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw (err);
    inquirer
      .prompt([{
        name: "title",
        type: "input",
        message: "What is the title of the new role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of the new role?",
      },
      {
        name: "departmentName",
        type: "list",
        // is there a way to make the options here the results of a query that selects all departments?`
        message: "Which department does this role fall under?",
        choices: function () {
          var choicesArray = [];
          res.forEach(res => {
            choicesArray.push(
              res.name
            );
          })
          return choicesArray;
        }
      }
      ])
    // in order to get the id here, i need a way to grab it from the departments table 
    .then(function(answer) {
      const department = answer.departmentName;
      connection.query('SELECT * FROM DEPARTMENT', function(err, res) {
      
          if (err) throw (err);
       let filteredDept = res.filter(function(res) {
          return res.name == department;
      }
      )
      let id = filteredDept[0].id;
     let query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
     let values = [answer.title, parseInt(answer.salary), id]
     console.log(values);
      connection.query(query, values,
          function(err, res, fields) {
          console.log(`You have added this role: ${(values[0]).toUpperCase()}.`)
      })
          viewRoles()
          })
      })
  })









}