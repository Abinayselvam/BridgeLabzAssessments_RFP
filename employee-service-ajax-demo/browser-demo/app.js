const employeeList = document.getElementById('employeeList');
const statusBox = document.getElementById('status');
const loadButton = document.getElementById('loadEmployeesBtn');

function fetchEmployeesWithPromise() {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', '/api/employees', true);

    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        try {
          resolve(JSON.parse(request.responseText));
        } catch (error) {
          reject(error);
        }
      } else {
        reject(new Error(`Request failed with status ${request.status}`));
      }
    };

    request.onerror = () => {
      reject(new Error('Network error while calling employee service.'));
    };

    request.send();
  });
}

function renderEmployees(employees) {
  employeeList.innerHTML = '';

  employees.forEach((employee) => {
    const item = document.createElement('li');
    item.innerHTML = `
      <strong>${employee.name}</strong><br>
      Role: ${employee.role}<br>
      Salary: $${employee.salary.toLocaleString()}
    `;
    employeeList.appendChild(item);
  });
}

loadButton.addEventListener('click', () => {
  statusBox.textContent = 'Status: Loading employees...';
  employeeList.innerHTML = '<li>Fetching employee data...</li>';

  fetchEmployeesWithPromise()
    .then((employees) => {
      statusBox.textContent = `Status: Loaded ${employees.length} employees`;
      renderEmployees(employees);
    })
    .catch((error) => {
      statusBox.textContent = 'Status: Error';
      employeeList.innerHTML = `<li>${error.message}</li>`;
    });
});
