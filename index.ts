#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let myBalance = 50000; // Dollors

let myPin = 4455;

console.log(chalk.underline.bgBlueBright("Welcome to ATM"));

let pinAns = await inquirer.prompt([
  {
    name: "pin",
    type: "number",
    message: "Enter Your pin",
  },
]);
if (pinAns.pin === myPin ) {
    console.log(chalk.underline.bgBlue("Correct pin"));
    let operator = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select operation",
            choices: ["Withdraw","Check Balance","Fast Cash","Exit"],
        },
    ]);
    if (operator.operation === "Withdraw"){
        let amount = await inquirer.prompt([
            {
                name: "myAmount",
                type: "number",
                message: "Enter Amount",
            },
        ]);
        if (myBalance >= amount.myAmount){
            myBalance -= amount.myAmount;
            console.log(chalk.greenBright(`Remaining amount is: ${myBalance}`));
        }else if (myBalance < amount.myAmount){
            console.log(chalk.underline.redBright("Insufficiant Balance"));
        }

    } else if (operator.operation === "Check Balance"){
        console.log(chalk.yellowBright(`Your Balance is: ${myBalance}`)); 
    } else if (operator.operation === "Fast Cash"){
        let selectAmount = await inquirer.prompt([
            {
                name: "Select",
                type: "rawlist",
                message: "Please select amount",
                choices: [5000,1000,15000,20000],
            },
        ]);
        (myBalance -= selectAmount.Select);
        console.log(chalk.yellow(`Remaining amount is: ${myBalance}`));
        
    } else if (operator.operation === "Exit"){
        console.log(chalk.underline.bgBlackBright("Thank You For Visiting."));
    }

} else {
    console.log(chalk.italic.bgRedBright("Incorrect pin! Try Again."));
}