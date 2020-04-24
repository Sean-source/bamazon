let mysql = require('mysql');
let inquirer = require('inquirer');
require("dotenv").config();
let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.bamazonPassword,
    database: "bamazon"
})
class Bamazon {
    //creating connection to database
    constructor() {

    }



    start =  ()=> {
        connection.query('SELECT * FROM products', function (err, res) { //selecting all products from the products table
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
              connection.query('SELECT * FROM ?? WHERE ID = ?', ["products", answers.id], function (err, res2) {
                   // [{id:3,quanitty:10}]
                    console.table(res2);

                    console.log(answers.quantity, res2[0].QUANTITY);
                    if(res2[0].QUANTITY < parseInt(answers.QUANTITY)) {
                        console.log("Insufficient quantity.")
                    }
                    else {
                        let subtraction = res2[0].QUANTITY - answers.quantity;
                       let update = connection.query('UPDATE ?? SET ?? = ? WHERE ?? = ?',["products", "QUANTITY", subtraction, "id", answers.id], function(err, res3){
                            this.start();
                        })

                        console.log(update.sql);
                    }
                })

                //console.log(statement.sql);
            })

        }
        )

    }


}

let bamazon = new Bamazon();
bamazon.start();