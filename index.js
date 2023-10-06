// Your code here
// This function creates a record for an employee based on input data.
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// This function converts an array of employee data arrays into an array of employee records.
function createEmployeeRecords(employeeDataArrays) {
    return employeeDataArrays.map(createEmployeeRecord);
}

// This function records the time an employee checks in.
function createTimeInEvent(employee, dateStamp) {
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    });
    return employee;
}

// This function records the time an employee checks out.
function createTimeOutEvent(employee, dateStamp) {
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    });
    return employee;
}

// This function calculates the hours an employee worked on a specific date.
function hoursWorkedOnDate(employee, specificDate) {
    let inEvent = employee.timeInEvents.find(event => event.date === specificDate);
    let outEvent = employee.timeOutEvents.find(event => event.date === specificDate);
    return (outEvent.hour - inEvent.hour) / 100; // Dividing by 100 to convert from HHMM to hours.
}

// This function calculates the wages earned by an employee on a specific date.
function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;
}

// This function calculates the total wages for an employee.
function allWagesFor(employee) {
    let datesWorked = employee.timeInEvents.map(event => event.date);
    return datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
}

// This function calculates the total payroll for all employees.
function calculatePayroll(employees) {
    return employees.reduce((total, emp) => total + allWagesFor(emp), 0);
}
