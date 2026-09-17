// Store all expenses
let expenses = [];


// Get the form
let form = document.getElementById("expense-form");


// Add Expense
form.addEventListener("submit", function(event) {

    // Stop page refresh
    event.preventDefault();

    // Get values
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;
    let date = document.getElementById("date").value;


    // Check input
    if (amount === "" || category === "" || date === "") {
        alert("Please enter all details.");
        return;
    }


    // Create expense
    let expense = {
        amount: Number(amount),
        category: category,
        date: date
    };


    // Add expense to array
    expenses.push(expense);


    // Update the page
    displayExpenses();
    updateDashboard();


    // Clear form
    form.reset();
});


// Display Expenses
function displayExpenses() {

    let table = document.getElementById("expense-table");

    // Clear old rows
    table.innerHTML = "";


    // Get selected category
    let selectedCategory =
        document.getElementById("filter-category").value;


    // Loop through expenses
    for (let i = 0; i < expenses.length; i++) {

        let expense = expenses[i];


        // Check category filter
        if (selectedCategory !== "All" &&
            expense.category !== selectedCategory) {

            continue;
        }


        // Create table row
        let row = document.createElement("tr");


        row.innerHTML =
            "<td>" + (i + 1) + "</td>" +
            "<td>" + expense.date + "</td>" +
            "<td>" + expense.category + "</td>" +
            "<td>₹" + expense.amount + "</td>" +
            "<td>" +
            "<button onclick='deleteExpense(" + i + ")'>" +
            "Delete" +
            "</button>" +
            "</td>";


        table.appendChild(row);
    }
}


// Update Dashboard
function updateDashboard() {

    let total = 0;
    let todayTotal = 0;


    // Get today's date
    let today = new Date().toISOString().split("T")[0];


    // Loop through expenses
    for (let i = 0; i < expenses.length; i++) {

        // Add to total
        total = total + expenses[i].amount;


        // Check if expense is from today
        if (expenses[i].date === today) {

            todayTotal = todayTotal + expenses[i].amount;
        }
    }


    // Update Total Expenses
    document.getElementById("total-expense").textContent =
        "₹" + total;


    // Update transaction count
    document.getElementById("transaction-count").textContent =
        expenses.length;


    // Update today's expense
    document.getElementById("today-expense").textContent =
        "₹" + todayTotal;
}


// Filter by Category
document.getElementById("filter-category")
    .addEventListener("change", function() {

        displayExpenses();

    });


// Delete Expense
function deleteExpense(index) {

    // Remove expense from array
    expenses.splice(index, 1);


    // Update page
    displayExpenses();
    updateDashboard();
}