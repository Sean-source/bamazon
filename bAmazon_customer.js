let mysql = require('my sql');
let inquirer = require('inquirer');

//creating connection to database
let connection = mysql.createConnection({
    host: "local host",
    port: 3306,
    user: "root",
    password: " ",
    database: "Bamazon"
})

let start = function () {
    connection.query('SELECT * FROM PRODUCTS', function (err, res) { //selecting all products from the products table
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].itemID + res[i].productName + res[i].prices);
        }
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
        ])

    }
    ).then(function () {


    })
}