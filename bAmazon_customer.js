let mysql = require('mysql');
let inquirer = require('inquirer');
require("dotenv").config();
class Bamazon {
    //creating connection to database
    constructor() {
        this.connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: process.env.bamazonPassword,
            database: "bamazon"
        })
    }


    start = function () {
        this.connection.query('SELECT * FROM products', function (err, res) { //selecting all products from the products table
            if (err) throw err;
            console.table(res);
            inquirer.prompt([{
                type: "number",
                name: "id",
                message: "What is the ID of the product?",
            },
            {
                type: "number",
                name: "quantity",
                message: "How much of the product would you like to buy?",
            }
            ]).then(function (answers) {
                console.log(answers);
            })

        }
        )

    }


}

let bamazon = new Bamazon();
bamazon.start();