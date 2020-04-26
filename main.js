require("dotenv").config();
let mysql = require('mysql');
let connect = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.bamazonPassword,
    database: "bamazon"
})
let BamazonCustomer = require("./bAmazon_customer")
let inquirer = require("inquirer")
let BamazonSupervisor = require("./bamazonSupervisor")
let BamazonManager = require("./bamazonManager")
let quit = false;
let bamazonSupervisor = new BamazonSupervisor();
let bamazonManager = new BamazonManager();
let bamazonCustomer = new BamazonCustomer(connect);

let promiseCustomer = new Promise((resolve, reject) => {

    let proceed =  bamazonCustomer.start();


    resolve(proceed)

  })
 function main() {
    inquirer.prompt({
        type: "list",
        name: "selection",
        message: "Please choose a selection.",
        choices: ["Customer", "Supervisor", "Manager", "quit"]
    }).then((input) => {
        switch (input.selection) {
            case "Customer":
           
               runCustomer();
                break;
            case "Manager":
                    //bamazonManager.start(); 
                    break;
            case "Supervisor":
                    break;   
            case "quit":
                connect.end()
                console.log("Exiting Program Now")
                break;
        }


    })
}


function runCustomer() {

    bamazonCustomer.start();
    
   
    
    // promiseCustomer.then((proceed)=>{
    // //     console.log("proceed",proceed);
      


    //     if(proceed === "main") {
    //         main();
    //     }
    //      else {
    //          return;
    //      }

    //  })

     
}



main();