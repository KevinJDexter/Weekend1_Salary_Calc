$(document).ready(onReady);

let totalSalary = 0;
let isGreyBackground = false;

function onReady() {
  $('#submitButton').click(employeeSubmitClickHandler);
  $('#cumulativeMonthlySalary').text(totalSalary/12);
  $('tbody').on('click', 'tr td button', deleteRow);
}

// Click handler for the Submit button
function employeeSubmitClickHandler() {
  if ( isNaN(getId() * 1) || isNaN( getSalary() * 1) || getId() == 0 || getSalary() == 0) {
    alert ('Id and Salary MUST be non-zero numbers');
    return false;
  }
  addEmployee();
  updateMonthlySalary('submit');  
  clearInputs();
}

// Adds a new employee row to the table;
function addEmployee () {
  let fName = '<td class="fNameTable">' + getFirstName() + '</td>';
  let lName = '<td class="lNameTable">' + getLastName() + '</td>';
  let employeeId = '<td class="idTable">' + getId() + '</td>';
  let title = '<td class="titleTable">' + getTitle() + '</td>';
  let salary = '<td class="salaryTable">' + addCommaToSalary(getSalary()) + '</td>';
  let delButton = '<td class = "delColumn"><button class="delButton">X</button></td>';
  let isGrey = ' class="greyRow"';
  if (!isGreyBackground) {
    isGrey = '';
  }
  isGreyBackground = !isGreyBackground;
  let newRow = '<tr' + isGrey + '>' + fName + lName + employeeId + title + salary + delButton + '</tr>';
  // $('#employeeInfo').append(newRow);
  $('#employeeInfo:last').prepend(newRow);
}

// Converts salary value to a string with Comma's
// Incomming salary should be a string
function addCommaToSalary (salary) {
  let commaSalary = '';
  if (salary.indexOf('.') > -1) {
    commaSalary = salary.substring(salary.indexOf('.'), salary.length);
    salary = salary.substring(0, salary.indexOf('.'));
  } 
  if (commaSalary.length == 0) {
    commaSalary = '.00';
  } else if (commaSalary.length == 2) {
    commaSalary += '0';
  }
  while (salary.length > 0) { 
    commaSalary = salary.substring(salary.length-3, salary.length) + commaSalary;
    salary = salary.substring(0, salary.length-3);
    if (salary.length > 0) {
      commaSalary = ',' + commaSalary;
    }
  }
  if (commaSalary == '') {
    commaSalary = '0';
  }
  return commaSalary;
}

// Delete Row functionality
function deleteRow () {
  let reduceAnnualBy = $(this).parent().siblings('.salaryTable').text();
  $(this).parent().parent().remove();
  updateMonthlySalary(reduceAnnualBy);
  recolorRows();
}

// Recolors the rows alternating grey and white when an element is deleted
function recolorRows () {
  let allRows = $('tbody').children();
  isGreyBackground = false;
  
  for (let i = allRows.length - 2; i >= 0; i--) {
    if (!isGreyBackground) {
      allRows.eq(i).removeClass('greyRow');
    } else {
      allRows.eq(i).addClass('greyRow');
    }
    isGreyBackground = !isGreyBackground;
  }
}

// updates value for the Total Monthly displayed at the bottom.
function updateMonthlySalary (val) {
  if ( val == 'submit' ) {
    totalSalary += getSalary() * 1;
  } else {
    let reduceAnnualBy = Number(val.replace(/,/g,'').replace('.00',''));
    totalSalary -= reduceAnnualBy;
  }
  let totalMonthlySalary = Math.round(totalSalary / 12 * 100)/100;
  let salaryString = totalMonthlySalary.toString();
  let newSalary = addCommaToSalary(salaryString);
  newSalary = '$' + newSalary;
  $('#cumulativeMonthlySalary').text(newSalary);
}

// Gets the First Name input value
function getFirstName() {
  return $('#fNameInput').val()
}

// Gets the Last Name input value
function getLastName() {
  return $('#lNameInput').val()
}

// Gets the Id input value
function getId() {
  return $('#idInput').val()
}

// Gets the Title input value
function getTitle() {
  return $('#titleInput').val()
}

// Gets the Salary input value
// Removes commas from user input for easier use
function getSalary() {
  let salary = $('#salaryInput').val()
  return salary.replace(/,/g, '');
}

// Restores all inputs to blank fields, displaying their placeholder text
function clearInputs () {
  $('#fNameInput').val('');
  $('#lNameInput').val('');
  $('#idInput').val('');
  $('#titleInput').val('');
  $('#salaryInput').val('');
}