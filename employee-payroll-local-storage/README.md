# Employee Payroll App - UC 1 to UC 6

HTML, CSS and JavaScript implementation of the supplied Employee Payroll assessment.

## UC 1 - Employee Payroll App Home Page
Home page with Employee Payroll header, employee count, Add Employee button and employee details table.

## UC 2 - Employee Payroll Form with Header and Name
Add Employee Payroll page with the same header style, name and payroll fields.

## UC 3 - Display Employee Details in Tabular Format
The JavaScript retrieves the table body using `document.getElementById()` and populates `innerHTML` after `DOMContentLoaded`.

## UC 4 - Display Employee Details using Template Literals
Uses ES6 template literals with backticks and `${expression}` placeholders to build table rows.

## UC 5 - Display Employee Details from JSON Object
Employee JSON data is displayed with a `for...of` loop. Department values are included and a department filter is generated from the JSON data.

## UC 6 - Display Employee Details from Local Storage
Employee Payroll data is retrieved from Local Storage into `employeePayrollList`, which has file-level scope. The employee count is displayed in the header. The `EmployeePayroll` class uses getters/setters with underscore-prefixed backing properties, so `JSON.stringify()` stores `_name`, `_department`, `_salary`, etc.

## Run in VS Code
Open the folder in VS Code and run `index.html` with Live Server. Click Add Employee, save a record, then return to Home. Verify the JSON under browser Developer Tools -> Application -> Local Storage.

## Git
`git init` -> `git add .` -> `git commit -m "Implement Employee Payroll UC1 to UC6"` -> `git branch -M main` -> `git remote add origin YOUR_GITHUB_REPOSITORY_URL` -> `git push -u origin main`
