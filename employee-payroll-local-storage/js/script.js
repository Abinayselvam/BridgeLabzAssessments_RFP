const form = document.querySelector('#employeeForm');
const formStatus = document.querySelector('#formStatus');
const tableBody = document.querySelector('#employeeTable tbody');
const emptyState = document.querySelector('#emptyState');
const summary = document.querySelector('#summary');
const searchInput = document.querySelector('#searchInput');
const clearAllBtn = document.querySelector('#clearAllBtn');
const recordIdInput = document.querySelector('#recordId');

const storageKey = 'employeePayrollData';
let employees = [];

const fields = {
  empName: {
    input: document.querySelector('#empName'),
    error: document.querySelector('#empNameError'),
    validate: (v) => v.trim().length >= 2,
    message: "Enter the employee's name (min 2 characters)."
  },
  empId: {
    input: document.querySelector('#empId'),
    error: document.querySelector('#empIdError'),
    validate: (v) => v.trim().length > 0,
    message: 'Employee ID is required.'
  },
  department: {
    input: document.querySelector('#department'),
    error: document.querySelector('#departmentError'),
    validate: (v) => v.trim().length > 0,
    message: 'Select a department.'
  },
  salary: {
    input: document.querySelector('#salary'),
    error: document.querySelector('#salaryError'),
    validate: (v) => v.trim().length > 0 && Number(v) > 0,
    message: 'Enter a salary greater than 0.'
  }
};

function loadEmployees() {
  try {
    const raw = localStorage.getItem(storageKey);
    employees = raw ? JSON.parse(raw) : [];
  } catch (error) {
    employees = [];
  }
}

function saveEmployees() {
  localStorage.setItem(storageKey, JSON.stringify(employees));
}

function validateField(key) {
  const field = fields[key];
  const value = field.input.value;
  const valid = field.validate(value);
  field.error.textContent = valid ? '' : field.message;
  field.input.closest('.field').classList.toggle('invalid', !valid);
  return valid;
}

function validateForm() {
  const results = Object.keys(fields).map(validateField);
  return results.every(Boolean);
}

function resetForm() {
  form.reset();
  recordIdInput.value = '';
  formStatus.textContent = '';
  formStatus.classList.remove('ok', 'error');
  Object.values(fields).forEach(({ error, input }) => {
    error.textContent = '';
    input.closest('.field').classList.remove('invalid');
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
}

function renderEmployees(filter = '') {
  const query = filter.trim().toLowerCase();
  const visibleEmployees = employees.filter((employee) => {
    const content = `${employee.name} ${employee.id} ${employee.department}`.toLowerCase();
    return content.includes(query);
  });

  tableBody.innerHTML = '';

  if (visibleEmployees.length === 0) {
    emptyState.style.display = 'block';
    summary.textContent = '';
    return;
  }

  emptyState.style.display = 'none';

  visibleEmployees.forEach((employee) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.id}</td>
      <td>${employee.department}</td>
      <td>${formatCurrency(employee.salary)}</td>
      <td>
        <div class="action-group">
          <button type="button" class="btn btn-secondary edit-btn" data-id="${employee.recordId}">Edit</button>
          <button type="button" class="btn btn-secondary delete-btn" data-id="${employee.recordId}">Delete</button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });

  const totalSalary = visibleEmployees.reduce((sum, emp) => sum + emp.salary, 0);
  summary.innerHTML = `
    <span>${visibleEmployees.length} employee${visibleEmployees.length > 1 ? 's' : ''}</span>
    <span>Total payroll: ${formatCurrency(totalSalary)}</span>
  `;
}

function showMessage(message, type = 'ok') {
  formStatus.textContent = message;
  formStatus.classList.remove('ok', 'error');
  formStatus.classList.add(type);
}

function getEmployeeById(recordId) {
  return employees.find((item) => item.recordId === recordId);
}

function handleSave(event) {
  event.preventDefault();
  if (!validateForm()) {
    showMessage('Please fix the highlighted fields.', 'error');
    return;
  }

  const recordId = recordIdInput.value;
  const employeeData = {
    name: fields.empName.input.value.trim(),
    id: fields.empId.input.value.trim(),
    department: fields.department.input.value,
    salary: Number(fields.salary.input.value)
  };

  if (recordId) {
    const existing = getEmployeeById(recordId);
    if (existing) {
      existing.name = employeeData.name;
      existing.id = employeeData.id;
      existing.department = employeeData.department;
      existing.salary = employeeData.salary;
      showMessage('Employee details updated successfully.', 'ok');
    }
  } else {
    employees.push({ ...employeeData, recordId: crypto.randomUUID() });
    showMessage('Employee added to payroll.', 'ok');
  }

  saveEmployees();
  renderEmployees(searchInput.value);
  resetForm();
}

function handleEdit(recordId) {
  const employee = getEmployeeById(recordId);
  if (!employee) return;

  recordIdInput.value = employee.recordId;
  fields.empName.input.value = employee.name;
  fields.empId.input.value = employee.id;
  fields.department.input.value = employee.department;
  fields.salary.input.value = employee.salary;
  showMessage('Editing employee record. Save to update changes.', 'ok');
}

function handleDelete(recordId) {
  const employee = getEmployeeById(recordId);
  if (!employee) return;

  employees = employees.filter((item) => item.recordId !== recordId);
  saveEmployees();
  renderEmployees(searchInput.value);
  showMessage(`${employee.name} has been removed from payroll.`, 'ok');
}

function handleTableClick(event) {
  const editButton = event.target.closest('.edit-btn');
  const deleteButton = event.target.closest('.delete-btn');

  if (editButton) {
    handleEdit(editButton.dataset.id);
    return;
  }

  if (deleteButton) {
    handleDelete(deleteButton.dataset.id);
    return;
  }
}

function handleClearAll() {
  if (employees.length === 0) {
    showMessage('No records to clear.', 'error');
    return;
  }

  if (!confirm('Remove all employee records from local storage?')) {
    return;
  }

  employees = [];
  saveEmployees();
  renderEmployees();
  resetForm();
  showMessage('All employee records have been cleared.', 'ok');
}

Object.keys(fields).forEach((key) => {
  const { input } = fields[key];
  input.addEventListener('input', () => validateField(key));
  input.addEventListener('change', () => validateField(key));
});

form.addEventListener('submit', handleSave);
form.addEventListener('reset', resetForm);
searchInput.addEventListener('input', () => renderEmployees(searchInput.value));
clearAllBtn.addEventListener('click', handleClearAll);
tableBody.addEventListener('click', handleTableClick);

loadEmployees();
renderEmployees();
