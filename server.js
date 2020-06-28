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

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update employee role",
        "Exit"
      ]
    })
    .then(function (answer) {
      if (answer.action === 'View all departments') {
        View_Department();
      } else if (answer.action === 'View all roles') {
        View_Roles();
      } else if (answer.action === 'View all employees') {
        View_Employees();
      } else if (answer.action === 'Add a department') {
        Add_Department;
      } else if (answer.action === 'Add a role') {
        Add_Role();
      } else if (answer.action === 'Add an employee') {
        Add_Employees();
      } else if (answer.action === 'Update employee role') {
        updateRole();
      }
      else if (answer.action === 'Exit') {
        connection.end();
      }
    })
}

function View_Department() {
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
  var query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    console.log(`ROLES:`)
    res.forEach(role => {
      console.log(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.department_id}`);
    })
    start();
  });
};

function View_Employees() {
  var query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    console.log(`EMPLOYEES:`)
    res.forEach(employee => {
      console.log(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role ID: ${employee.role_id} | Manager ID: ${employee.manager_id}`);
    })
    start();
  });
};

function Add_Department {
  inquirer
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
      View_Department();
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
      .then(function (answer) {
        const department = answer.departmentName;
        connection.query('SELECT * FROM DEPARTMENT', function (err, res) {

          if (err) throw (err);
          let filteredDept = res.filter(function (res) {
            return res.name == department;
          }
          )
          let id = filteredDept[0].id;
          let query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
          let values = [answer.title, parseInt(answer.salary), id]
          console.log(values);
          connection.query(query, values,
            function (err, res, fields) {
              console.log(`You have added this role: ${(values[0]).toUpperCase()}.`)
            })
          View_Roles()
        })
      })
  })
}

async function Add_Employees() {
  connection.query('SELECT * FROM role', function (err, result) {
    if (err) throw (err);
    inquirer
      .prompt([{
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "roleName",
        type: "list",
        // is there a way to make the options here the results of a query that selects all departments?`
        message: "What role does the employee have?",
        choices: function () {
          rolesArray = [];
          result.forEach(result => {
            rolesArray.push(
              result.title
            );
          })
          return rolesArray;
        }
      }
      ])
      // in order to get the id here, i need a way to grab it from the departments table 
      .then(function (answer) {
        console.log(answer);
        const role = answer.roleName;
        connection.query('SELECT * FROM role', function (err, res) {
          if (err) throw (err);
          let filteredRole = res.filter(function (res) {
            return res.title == role;
          })
          let roleId = filteredRole[0].id;
          connection.query("SELECT * FROM employee", function (err, res) {
            inquirer
              .prompt([
                {
                  name: "manager",
                  type: "list",
                  message: "Who is your manager?",
                  choices: function () {
                    managersArray = []
                    res.forEach(res => {
                      managersArray.push(
                        res.last_name)

                    })
                    return managersArray;
                  }
                }
              ]).then(function (managerAnswer) {
                const manager = managerAnswer.manager;
                connection.query('SELECT * FROM employee', function (err, res) {
                  if (err) throw (err);
                  let filteredManager = res.filter(function (res) {
                    return res.last_name == manager;
                  })
                  let managerId = filteredManager[0].id;
                  console.log(managerAnswer);
                  let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                  let values = [answer.firstName, answer.lastName, roleId, managerId]
                  console.log(values);
                  connection.query(query, values,
                    function (err, res, fields) {
                      console.log(`You have added this employee: ${(values[0]).toUpperCase()}.`)
                    })
                  View_Employees();
                })
              })
          })
        })
      })
  })
}

function updateRole() {
  connection.query('SELECT * FROM employee', function (err, result) {
    if (err) throw (err);
    inquirer
      .prompt([
        {
          name: "employeeName",
          type: "list",
          // is there a way to make the options here the results of a query that selects all departments?`
          message: "Which employee's role is changing?",
          choices: function () {
            employeeArray = [];
            result.forEach(result => {
              employeeArray.push(
                result.last_name
              );
            })
            return employeeArray;
          }
        }
      ])
      // in order to get the id here, i need a way to grab it from the departments table 
      .then(function (answer) {
        console.log(answer);
        const name = answer.employeeName;
        /*const role = answer.roleName;
        connection.query('SELECT * FROM role', function(err, res) {
            if (err) throw (err);
            let filteredRole = res.filter(function(res) {
                return res.title == role;
            })
        let roleId = filteredRole[0].id;*/
        connection.query("SELECT * FROM role", function (err, res) {
          inquirer
            .prompt([
              {
                name: "role",
                type: "list",
                message: "What is their new role?",
                choices: function () {
                  rolesArray = [];
                  res.forEach(res => {
                    rolesArray.push(
                      res.title)

                  })
                  return rolesArray;
                }
              }
            ]).then(function (rolesAnswer) {
              const role = rolesAnswer.role;
              console.log(rolesAnswer.role);
              connection.query('SELECT * FROM role WHERE title = ?', [role], function (err, res) {
                if (err) throw (err);
                let roleId = res[0].id;
                let query = "UPDATE employee SET role_id ? WHERE last_name ?";
                let values = [roleId, name]
                console.log(values);
                connection.query(query, values,
                  function (err, res, fields) {
                    console.log(`You have updated ${name}'s role to ${role}.`)
                  })
                View_Employees();
              })
            })
        })

        //})
      })
  })

}

