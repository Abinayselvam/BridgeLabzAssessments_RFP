# Employee Payroll App - Local Storage

A simple HTML5, CSS and JavaScript Employee Payroll application.

## Assessment coverage

This project follows the uploaded assessment requirements:

- Employee Payroll object with attributes such as department, gender, employee notes and profile picture.
- Event listeners after document load.
- Salary range value displayed dynamically.
- Name and date validation.
- Employee Payroll object created on Save.
- Employee data saved to HTML5 Local Storage.
- Reset button clears the form.
- Saved employees are displayed from Local Storage.

The assessment specifically introduces HTML5 Local Storage and contrasts it with cookies and session storage. Local Storage persists after the browser window is closed and is scoped to the same origin.

## How to run in VS Code

1. Extract/open this folder in VS Code.
2. Open `index.html`.
3. Run it using the VS Code Live Server extension, or open `index.html` directly in a browser.
4. Fill in the form and click **Save Employee**.
5. Open browser Developer Tools -> Application -> Local Storage to verify the saved JSON.

## Git commands

```bash
git init
git add .
git commit -m "Add Employee Payroll App with Local Storage"
git branch -M main
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

## Project structure

```text
employee-payroll-local-storage/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── README.md
```
