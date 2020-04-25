let inquirer = require('inquirer');
require("dotenv").config();

let total = 0;
let flag = false;
class BamazonCustomer {


    //creating connection to database
    constructor(connect) {
        this.connection = connect;
        this.total = total;

    }

    openConnection = function () {
        this.connection.connect((err) => {
            if (err) throw err;
        })
    }

    start = function () {
        //this.openConnection();

        //  console.log(this.name)


        if (flag) {
            this.connection.end();
            return;
        }
        else {
            this.connection.query('SELECT * FROM products', (err, res) => { //selecting all products from the products table
                if (err) throw err;
                console.table(res);
                inquirer.prompt([
                    {
                        type: "input",
                        name: "main",
                        message: "Would you like to return to the main menu? Press m to return to the main menu, otherwise press any other key to continue."
    
                    }
                ]).then((input) => {
                    if (input.main.toLowerCase() === 'm') {
                         
                        flag = true;
                        this.start();
                    } else {
                        inquirer.prompt([
    
                            {
                                type: "number",
                                name: "id",
                                message: "What is the ID of the product?",
                            },
                            {
                                type: "number",
                                name: "quantity",
                                message: "How much of the product would you like to buy?",
                            },
    
                        ]).then((answers) => {
    
                            // console.log(answers);
                            this.connection.query('SELECT * FROM ?? WHERE ID = ?', ["products", answers.id], (err, res2) => {
                                // [{id:3,quanitty:10}]
                                console.table(res2);
    
                                // console.log(answers.quantity, res2[0].QUANTITY);
                                if (res2[0].QUANTITY < answers.quantity) {
                                    console.log("Insufficient quantity.")
                                    this.start();
                                }
                                else {
                                    this.total += answers.quantity * res2[0].PRICE;
                                    console.log("This is your total cost: $" + this.total);
                                    let subtraction = res2[0].QUANTITY - answers.quantity;
                                    let update = this.connection.query('UPDATE ?? SET ?? = ? WHERE ?? = ?', ["products", "QUANTITY", subtraction, "id", answers.id], (err, res3) => {
                                        this.start();
                                    })
                                }
                            })
    
                            //console.log(statement.sql);
                        })
    
                    }
    
                })
    
    
            }
            )
    
        }
      


    }


}





module.exports = BamazonCustomer