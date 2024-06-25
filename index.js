#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//intialize user balance and pin code
let mybalance = 5000;
let mypin = 123;
console.log(chalk.blue("\n\tWelcome to Ahzam - ATM Machine\n"));
let pinanswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: "ENTER YOUR PIN : "
    },
]);
if (pinanswer.pin === mypin) {
    console.log(chalk.green("\tYour pin is correct , LOGIN SUCCESSFULLY"));
    let operationans = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an Operation",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (operationans.operation === "Withdraw Amount") {
        let amountans = await inquirer.prompt([
            {
                name: "amount",
                type: "number",
                message: "Enter Amount to Withdraw "
            }
        ]);
        if (amountans.amount > mybalance) {
            console.log(chalk.red("Insufficient Balance"));
        }
        else {
            let confirm = await inquirer.prompt([
                {
                    name: "toconfirm",
                    type: "list",
                    message: `Are u sure to withdraw ${amountans}`,
                    choices: ["yes, I am sure", "No, I am not sure",],
                }
            ]);
            if (confirm.toconfirm === "No, I am not sure") {
                console.log(chalk.blue("Thank u for Using our ATM Machine"));
                console.log(chalk.blue(`Your Account Balance is: ${mybalance}`));
            }
            else {
                mybalance -= amountans.amount;
                console.log(chalk.green(`${amountans.amount} Withdraw sucessfully`));
                console.log(chalk.blue(`Your Reamining Balance is : ${mybalance}`));
            }
        }
        ;
    }
    else if (operationans.operation === "Check Balance") {
        console.log(chalk.blue(`Your Account Balance is: ${mybalance}`));
    }
}
else if (pinanswer.pin !== mypin) {
    console.log(chalk.red("Your PIN is incorrect"));
}
;
