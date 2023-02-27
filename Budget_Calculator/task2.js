/**

 * Compulsory Task 2
    Follow these steps:
    ● Create a basic HTML file. You are required to create a budgeting website with the following specifications:
    ● Make use of session storage to store the values.
    ● Create an income object where you can put in the following information as
        attributes:
            ○ Name, as a string (E.g. Salary)
            ○ The amount, as a number (E.g. 4000)
            ○ Whether or not it is recurring, as a boolean
    ● Create 5 different objects to represent income from different places.
    ● Create an expenses object where you can put in the following information
        as attributes:
            ○ Name, as a string (E.g. Groceries)
            ○ The amount, as a number (E.g. 350)
            ○ Whether or not it is recurring, as a boolean
    ● Create 5 different objects to represent different expenses.
    ● Using a prompt box, display the income items and let the user add another
        entry.
    ● Using a prompt box, display the expenses items and let the user add
        another entry.
    ● Display the total amount of disposable income (income minus expenses)
    ● Using a prompt box, ask the user how much of their disposable income
        they would like to put into savings.
    ● Finally, create an alert to display the total amount of disposable income left.

 */

    //I will be using input boxes and will display the results in the DOM instead of using prompt alerts in the browser.
    //This will require more coding, but will improve UX and make the project more suitable for portfolio demonstration.
    //This would make the code maintainable


//create a class constructor 
//(I could have created two indivdual classes but this makes the program expandible in the future while helping me solidify my knowledge of Object constructors and Classes)
class Budget {
    constructor(type, amount, recurring) {
        this.type = type
        this.amount = amount
        this.recurring = recurring
    }
}
//create children constructors
class Income extends Budget {
    constructor(type, amount, recurring) {
        super(type, amount, recurring)
        this.income = true
    }
}
class Expense extends Budget {
    constructor(type, amount, recurring) {
        super(type, amount, recurring)
        this.income = false
    }
}

//create arrays
let incomeArr = []
let expensesArr =[]

//Create 5 entries for each class
let salary = new Income ("Salary", 2500, true);
let freelanceWork = new Income ("Freelance", 1000, true);
let gift = new Income ("Gift", 200, false);
let dividends = new Income ("Dividends", 400, true);
let bonus = new Income ("Bonus", 1000, false);
incomeArr.push(salary, freelanceWork, gift, dividends, bonus)
sessionStorage.setItem("Income", JSON.stringify(incomeArr))

let groceries = new Expense ("Groceries", 350, true)
let rent = new Expense ("Rent", 1000, true)
let bills = new Expense ("Bills", 280, true)
let entertainment = new Expense ("Entertainment", 150, false)
let travel = new Expense ("Travel", 140, true)
expensesArr.push(groceries, rent, bills, entertainment, travel)
sessionStorage.setItem("Expense", JSON.stringify(expensesArr))

//Resets checkbox label to default and display current sessionStorage data on page load
function loadPage() {
    document.getElementById("recIncome").checked = true
    createEntry("Income")
    createEntry("Expense")
    calculateDisposableIncome()
}

//Set initial value for the calculator
let incTotal = 0
let expTotal = 0
let savingsAmount = 0

//Function to populate DOM and display
function createEntry(argument) {
    if (sessionStorage.getItem(argument) == null) {
        sessionStorage.setItem(argument, JSON.stringify([]));
        //checks if a sessionStorage file exists and creates an empy one if not
    } else {
    
        let newList = document.getElementById(argument);
        newList.innerHTML = ""; //resets the list to avoid repeating it for each new entry
        let newArr = JSON.parse(sessionStorage.getItem(argument));//import session storage into an array and convert back into objects

        //resets the calculator
        if (argument === "Income") {
            incTotal = 0
        } else {
            expTotal = 0
        }

        //Create elements and populate the DOM
        newArr.forEach((item, index) => {
                let li = document.createElement("li"); //for each, create a li element 
                let span = document.createElement("span"); //for each, create a span element 
                li.id = "li" + index
                span.className = "close"; //create a css class and assign it to the span element 
                span.innerHTML = " \u00D7"; //add text to the span element (X)
                li.innerText = `${item.type}: \u00A3${item.amount} (${item.recurring ? "Recurring" : "Not recurring"})`;
                li.appendChild(span)
                newList.appendChild(li);


            //create a delete button
            li.addEventListener("mouseover", function() {
                span.style.display = "inline"; // show the 'delete' button when the title input changes
            });
            li.addEventListener("mouseout", function() {
                span.style.display = "none"; // show the 'delete' button when the title input changes
            });

            //create function to delete the li item to assign to the span element
            span.addEventListener("click",function() {
                newArr.splice(index, 1) //removes item from the array
                li.remove() //effectively removes item from the DOM

                if (newArr.length === 0) {
                    if (argument === "Income") {
                        incTotal = 0
                        disposableIncome.innerHTML = `Income: \u00A3${incTotal} \n- Expenses: \u00A3${expTotal}`;
                        //reset displayed amount to 0 if the array is empty
                        sessionStorage.removeItem("Income"); //reset sessionStorage
                    } else if (argument == "Expense") {
                        expTotal = 0
                        disposableIncome.innerHTML = `Income: \u00A3${incTotal} \n- Expenses: \u00A3${expTotal}`;
                        sessionStorage.removeItem("Expense");
                    } //checks if all items have been deleted and if so removes the sessionStorage
                } else {
                    if (argument === "Income") {
                        sessionStorage.setItem("Income", JSON.stringify(newArr))
                    } else
                        sessionStorage.setItem("Expense", JSON.stringify(newArr))
                     //replaces the sessionStorage with the new array

                    createEntry(argument)
                    //this will make sure all id and index values match by refreshing the whole list
                    calculateDisposableIncome()
                }
            })   
        });
    }
}

//function to add new entry from user input
function addEntry(argument) {
    if (sessionStorage.getItem(argument) == null) {
        sessionStorage.setItem(argument, JSON.stringify([]));
        //checks if a books sessionStorage file exists and creates an empy one if not
    } else {
        //add sessionStorage to array
        let newArr = JSON.parse(sessionStorage.getItem(argument))
        // console.log(newArr)

        let type = document.getElementById("type").value.trim(); //get user input from DOM
        let amount = document.getElementById("amount").value.trim(); //might need to cast to Number
        let recurring = document.getElementById("recIncome").checked;
        amount = Number(amount) //cast input value to a number

        //input validation
        if (!type || !amount) {
            alert("Please fill all input fields.");
            return;
        }

        //create new object
        let newEntry;
        if (argument === "Income") {
          newEntry = new Income(type, amount, recurring);
        } else {
          newEntry = new Expense(type, amount, recurring);
        }
        //A shorter way to do the above, left it in here for future reference:
        // let BudgetType = argument === "Income" ? Income : Expense;
        // //takes function argument and conversts it into constructor keyword
        // let newEntry = new BudgetType(type, amount, recurring)

        newArr.push(newEntry) //add entry to array
        sessionStorage.setItem(argument, JSON.stringify(newArr)) //refresh sessionStorage

        //reset input boxes
        document.getElementById("type").value = ""
        document.getElementById("amount").value = ""
        document.getElementById("recIncome").checked = true

        //call external functions
        createEntry(argument)
        calculateDisposableIncome()
    }
}

//function to calculate and display the disposable income
function calculateDisposableIncome() {
    let disposableIncome = document.getElementById("disposableIncome")
    let incomeArr = JSON.parse(sessionStorage.getItem("Income"))
    let expenseArr = JSON.parse(sessionStorage.getItem("Expense"))
    incTotal = 0
    expTotal = 0

    incomeArr.forEach((item) => {
        incTotal += item.amount
    });
    expenseArr.forEach((item) => {
        expTotal += item.amount
    });

    let total = incTotal - expTotal
    disposableIncome.innerHTML = `Income: \u00A3${incTotal} \n- Expenses: \u00A3${expTotal} \n= \n\u00A3${total}`;
}

//function to calculate the savings amount and adjust disposable income
function calculateSavings() {
    let input = document.getElementById("savingsAmount").value
    savingsAmount += Number(input)
    let savingsDisplay = document.getElementById("totSavings")
    savingsDisplay.innerHTML = savingsAmount
    document.getElementById("savingsAmount").value = ""
    
    if (!input) {
        alert("please specify a savings amount")
    }

    let remaingDisplay = document.getElementById("remainingIncome")
    remaingDisplay.innerHTML = (incTotal - expTotal) - savingsAmount
}


/*

Resources:
https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
    [accessed 21/02/2023]
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
    [Accessed 23/02/2023]

*/