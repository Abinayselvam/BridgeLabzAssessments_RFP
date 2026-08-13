# Employee Service AJAX Demo

This folder demonstrates the Employee Service problem in two forms:

1. Terminal-based Node.js demo using AJAX callback and Promise
2. In-browser demonstration using an HTTP service and XMLHttpRequest Promise call

## Files

- `server.js` — simple HTTP server exposing `/api/employees`
- `terminal-demo.js` — Node.js callback and Promise examples
- `browser-demo/index.html` — browser UI
- `browser-demo/app.js` — fetch logic using Promise with AJAX

## Run in VS Code

### 1) Terminal demo

Open a terminal in this folder and run:

```bash
node server.js
```

Then in a second terminal, run:

```bash
node terminal-demo.js
```

### 2) Browser demo

Start the server:

```bash
node server.js
```

Then open:

```text
http://localhost:3000
```

Click the `Load Employees` button to fetch data from the HTTP service.

## Notes

This demo follows the same idea as the live session: employee service data is retrieved asynchronously using AJAX-style calls, with callback and Promise-based patterns.
