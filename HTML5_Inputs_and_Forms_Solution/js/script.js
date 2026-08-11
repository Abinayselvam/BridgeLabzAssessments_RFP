/* ============================================================
   Class demo carry-over: range slider live output
   (same "input" event pattern shown in class: salary -> output)
   ============================================================ */
const salary = document.querySelector('#salary');
const salaryOutput = document.querySelector('.salary-output');

salary.addEventListener('input', function () {
  salaryOutput.textContent = salary.value;
});

/* ============================================================
   UC1 - First Name
   Rule: starts with a Capital letter, minimum 3 characters total
   ============================================================ */
const firstName = document.querySelector('#firstName');
const firstNameError = document.querySelector('output.text-error[for="firstName"]');
const nameRegex = /^[A-Z][a-zA-Z]{2,}$/; // Cap + at least 2 more letters = min 3 chars

function validateFirstName() {
  const isValid = nameRegex.test(firstName.value.trim());
  if (firstName.value.trim() === '') {
    firstNameError.textContent = '';
  } else if (!isValid) {
    firstNameError.textContent = 'Name is Incorrect - must start with a capital letter and be at least 3 characters';
  } else {
    firstNameError.textContent = '';
  }
  return isValid;
}

firstName.addEventListener('input', validateFirstName);

/* ============================================================
   UC2 - Email
   Rule: abc.xyz@bl.co.in
   3 mandatory parts (abc, bl, co) + 2 optional parts (xyz, in)
   with precise @ and . positions
   local-part : mandatory-part(.optional-part)?
   domain     : mandatory-part.mandatory-part(.optional-part)?
   ============================================================ */
const email = document.querySelector('#email');
const emailError = document.querySelector('output.text-error[for="email"]');
const emailRegex = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)?@[a-zA-Z0-9]+\.[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)?$/;

function validateEmail() {
  const isValid = emailRegex.test(email.value.trim());
  if (email.value.trim() === '') {
    emailError.textContent = '';
  } else if (!isValid) {
    emailError.textContent = 'Email is Incorrect - expected format like abc.xyz@bl.co.in';
  } else {
    emailError.textContent = '';
  }
  return isValid;
}

email.addEventListener('input', validateEmail);

/* ============================================================
   UC3 - Mobile Number
   Rule: country code, followed by a space, followed by 10 digit number
   e.g. 91 9919819801
   ============================================================ */
const mobile = document.querySelector('#mobile');
const mobileError = document.querySelector('output.text-error[for="mobile"]');
const mobileRegex = /^\d{1,3} \d{10}$/;

function validateMobile() {
  const isValid = mobileRegex.test(mobile.value.trim());
  if (mobile.value.trim() === '') {
    mobileError.textContent = '';
  } else if (!isValid) {
    mobileError.textContent = 'Mobile is Incorrect - expected format like 91 9919819801';
  } else {
    mobileError.textContent = '';
  }
  return isValid;
}

mobile.addEventListener('input', validateMobile);

/* ============================================================
   UC4 - Password
   Rule1: minimum 8 characters
   Rule2: at least 1 upper case letter
   Rule3: at least 1 numeric digit
   Rule4: has exactly 1 special character
   NOTE: All rules must be passed
   ============================================================ */
const password = document.querySelector('#password');
const passwordError = document.querySelector('output.text-error[for="password"]');

const ruleLen = document.querySelector('#ruleLen');
const ruleUpper = document.querySelector('#ruleUpper');
const ruleNum = document.querySelector('#ruleNum');
const ruleSpecial = document.querySelector('#ruleSpecial');

// special characters considered here (exactly one of these should be present)
const specialCharPattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g;

function countSpecialChars(value) {
  const matches = value.match(specialCharPattern);
  return matches ? matches.length : 0;
}

function toggleRule(el, valid) {
  el.classList.toggle('valid', valid);
}

function validatePassword() {
  const value = password.value;

  const hasMinLen = value.length >= 8;
  const hasUpper = /[A-Z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const specialCount = countSpecialChars(value);
  const hasExactlyOneSpecial = specialCount === 1;

  toggleRule(ruleLen, hasMinLen);
  toggleRule(ruleUpper, hasUpper);
  toggleRule(ruleNum, hasNumber);
  toggleRule(ruleSpecial, hasExactlyOneSpecial);

  const allRulesPassed = hasMinLen && hasUpper && hasNumber && hasExactlyOneSpecial;

  if (value === '') {
    passwordError.textContent = '';
  } else if (!allRulesPassed) {
    passwordError.textContent = 'Password does not meet all the rules above';
  } else {
    passwordError.textContent = '';
  }

  return allRulesPassed;
}

password.addEventListener('input', validatePassword);

/* ============================================================
   Form submit - re-check every Use Case with Event Listener
   ============================================================ */
const demoForm = document.querySelector('#demoForm');
const formStatus = document.querySelector('#formStatus');

demoForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const validName = validateFirstName();
  const validEmail = validateEmail();
  const validMobile = validateMobile();
  const validPassword = validatePassword();

  const allValid = validName && validEmail && validMobile && validPassword;

  formStatus.classList.remove('ok', 'error');
  if (allValid) {
    formStatus.textContent = 'All Use Case validations passed. Form submitted successfully!';
    formStatus.classList.add('ok');
  } else {
    formStatus.textContent = 'Please fix the highlighted fields before submitting.';
    formStatus.classList.add('error');
  }
});
