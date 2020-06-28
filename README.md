# Employee-Tracker

[![GitHub license](https://img.shields.io/badge/licence-BSD3.0-green)](https://github.com/mauricechouam/Employee-Tracker)
Command Line  Application that allows user to architect and build a solution for managing a company's employees.  using node, inquirer, and MySQL.
## Table of Contents ##
  * [User_Story](#User_Story)
  * [Instructions](#Instructions)
  * [Acceptance Criteria](#Acceptance_Criteria)
  * [Helpful links](#Helpful_links)


## User Story
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business

## Instructions

Design the following database schema containing three tables:

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager



## Acceptance Criteria

* Functional application.

* GitHub repository with a unique name and a README describing the project.

* The command-line application should allow users to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles


## Helpful links

* Use the [MySQL](https://www.npmjs.com/package/mysql) NPM package to connect to your MySQL database and perform queries.

* Use [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3) NPM package to interact with the user via the command-line.

* Use [console.table](https://www.npmjs.com/package/console.table) to print MySQL rows to the console. There is a built-in version of `console.table`, but the NPM package formats the data a little better for our purposes.


