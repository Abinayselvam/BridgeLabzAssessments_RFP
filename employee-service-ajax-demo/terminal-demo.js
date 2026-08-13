const http = require('http');

const EMPLOYEE_URL = 'http://localhost:3000/api/employees';

function getEmployeesWithCallback(callback) {
  const request = http.get(EMPLOYEE_URL, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const employees = JSON.parse(data);
        callback(null, employees);
      } catch (error) {
        callback(error, null);
      }
    });
  });

  request.on('error', (error) => {
    callback(error, null);
  });
}

function getEmployeesWithPromise() {
  return new Promise((resolve, reject) => {
    const request = http.get(EMPLOYEE_URL, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const employees = JSON.parse(data);
          resolve(employees);
        } catch (error) {
          reject(error);
        }
      });
    });

    request.on('error', (error) => {
      reject(error);
    });
  });
}

console.log('1) Employee Service Problem using Ajax Callback in Node.js');
getEmployeesWithCallback((error, employees) => {
  if (error) {
    console.error('Callback error:', error.message);
    return;
  }

  console.log('Callback result:');
  console.log(employees);
  console.log('Total employees:', employees.length);
  console.log('Names:', employees.map((employee) => employee.name).join(', '));
});

console.log('\n2) Employee Service Problem using Promise in Node.js');
getEmployeesWithPromise()
  .then((employees) => {
    console.log('Promise result:');
    console.log(employees);
    console.log('Top salary:', Math.max(...employees.map((employee) => employee.salary)));
  })
  .catch((error) => {
    console.error('Promise error:', error.message);
  });
