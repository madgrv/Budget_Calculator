# Budget Calculator

A simple budget calculator with DOM manipulation and JSON.

## Instructions

1. Go to https://madgrv.github.io/budget_Calculator/ alternatively clone or download the repository.
2. Open `index.html` in a web browser.
3. Enter income and expense details in the provided input fields.
4. Click the "Add Income" or "Add Expense" button to add new entries.
5. The total disposable income is calculated automatically and displayed on the page.
6. Enter the amount of savings you would like to put aside in the input field provided.
7. The remaining disposable income is calculated and displayed in an alert.

## Initial Brief

    - Create a basic HTML file. You are required to create a budgeting website with the following specifications:
      - Make use of session storage to store the values.
      - Create an income object where you can put in the following information as attributes:
        - Name, as a string (E.g. Salary)
        - The amount, as a number (E.g. 4000)
        - Whether or not it is recurring, as a boolean
      - Create 5 different objects to represent income from different places.
      - Create an expenses object where you can put in the following information as attributes:
        - Name, as a string (E.g. Groceries)
        - The amount, as a number (E.g. 350)
        - Whether or not it is recurring, as a boolean
      - Create 5 different objects to represent different expenses.
      - Using a prompt box, display the income items and let the user add another entry.
      - Using a prompt box, display the expenses items and let the user add another entry.
      - Display the total amount of disposable income (income minus expenses).
      - Using a prompt box, ask the user how much of their disposable income they would like to put into savings.
      - Finally, create an alert to display the total amount of disposable income left.

## Changes Made

- Used input fields instead of prompt boxes for better user experience.
- Displayed results in the DOM instead of using alerts.

## Screenshot

![Image description](/Budget_Calculator/Screenshot.png)
