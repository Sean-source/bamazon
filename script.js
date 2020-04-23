let mysql = require('my sql');
let inquirer = require('inquirer');

let connection = mysql.createConnection({
    host: "local host",
    port: 3306,
    user: "root",
    password: " ",
    database: "Bamazon"
})