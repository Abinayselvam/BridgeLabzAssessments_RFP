const STORAGE_KEY = "employeePayrollList";

const form = document.getElementById("employeeForm");
const salary = document.getElementById("salary");
const salaryValue = document.getElementById("salaryValue");
const employeeList = document.getElementById("employeeList");
const clearStorageButton = document.getElementById("clearStorage");
const formMessage = document.getElementById("formMessage");
const nameError = document.getElementById("nameError");
const dateError = document.getElementById("dateError");

document.addEventListener("DOMContentLoaded", () => {
  salary.addEventListener("input", updateSalary);
  form.addEventListener("submit", saveEmployee);
  form.addEventListener("reset", resetForm);
  clearStorageButton.addEventListener("click", clearEmployees);

  updateSalary();
  renderEmployees();
});

function updateSalary() {
  salaryValue.textContent = Number(salary.value).toLocaleString("en-IN");
}

function validateForm() {
  let valid = true;
  const name = document.getElementById("name").value.trim();
  const startDate = document.getElementById("startDate").value;

  nameError.textContent = "";
  dateError.textContent = "";

  if (!/^[A-Za-z ]{3,50}$/.test(name)) {
    nameError.textContent = "Name must contain only letters and spaces (3-50 characters).";
    valid = false;
  }

  if (!startDate) {
    dateError.textContent = "Start date is required.";
    valid = false;
  } else if (new Date(startDate) > new Date()) {
    dateError.textContent = "Start date cannot be in the future.";
    valid = false;
  }

  return valid;
}

function saveEmployee(event) {
  event.preventDefault();
  formMessage.textContent = "";
  formMessage.className = "message";

  if (!validateForm()) {
    formMessage.textContent = "Please correct the validation errors.";
    formMessage.classList.add("error");
    return;
  }

  const profileFile = document.getElementById("profilePic").files[0];

  const createEmployee = (profilePic = "") => {
    const employee = {
      id: Date.now(),
      name: document.getElementById("name").value.trim(),
      profilePic,
      gender: document.querySelector('input[name="gender"]:checked')?.value || "",
      department: document.getElementById("department").value,
      salary: Number(salary.value),
      startDate: document.getElementById("startDate").value,
      benefits: [...document.querySelectorAll('input[name="benefits"]:checked')].map(cb => cb.value),
      notes: document.getElementById("notes").value.trim()
    };

    const employees = getEmployees();
    employees.push(employee);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));

    form.reset();
    updateSalary();
    renderEmployees();

    formMessage.textContent = "Employee saved successfully to Local Storage.";
    formMessage.classList.add("success");
  };

  if (profileFile) {
    const reader = new FileReader();
    reader.onload = () => createEmployee(reader.result);
    reader.readAsDataURL(profileFile);
  } else {
    createEmployee();
  }
}

function getEmployees() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function renderEmployees() {
  const employees = getEmployees();

  if (employees.length === 0) {
    employeeList.innerHTML = '<p class="empty">No employees saved yet.</p>';
    return;
  }

  employeeList.innerHTML = employees.map(employee => `
    <article class="employee">
      ${employee.profilePic ? `<img class="profile" src="${employee.profilePic}" alt="Profile picture">` : ""}
      <strong>${escapeHtml(employee.name)}</strong>
      <p><b>Department:</b> ${escapeHtml(employee.department || "Not selected")}</p>
      <p><b>Gender:</b> ${escapeHtml(employee.gender || "Not selected")}</p>
      <p><b>Salary:</b> ₹${employee.salary.toLocaleString("en-IN")}</p>
      <p><b>Start Date:</b> ${escapeHtml(employee.startDate)}</p>
      <p><b>Benefits:</b> ${escapeHtml(employee.benefits.join(", ") || "None")}</p>
      <p><b>Notes:</b> ${escapeHtml(employee.notes || "None")}</p>
    </article>
  `).join("");
}

function clearEmployees() {
  if (confirm("Delete all saved employees from Local Storage?")) {
    localStorage.removeItem(STORAGE_KEY);
    renderEmployees();
    formMessage.textContent = "Local Storage cleared.";
    formMessage.className = "message success";
  }
}

function resetForm() {
  setTimeout(() => {
    nameError.textContent = "";
    dateError.textContent = "";
    formMessage.textContent = "";
    formMessage.className = "message";
    updateSalary();
  }, 0);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
