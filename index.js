function createEmployeeRecord([firstN, familyN, title, payPerHour]){
    return {
        'firstName': firstN,
        'familyName': familyN,
        'title': title,
        'payPerHour': payPerHour,
        'timeInEvents': [],
        'timeOutEvents': []
    }
}

function createEmployeeRecords(employeeRecArr){
    let employeeRecords = []
    for (let employeeR of employeeRecArr){
        employeeRecords.push(createEmployeeRecord(employeeR))
    }
    return employeeRecords
}

function createTimeInEvent(employeeR, dateStamp){
    const date = dateStamp.slice(0,10)
    const hour = parseInt(dateStamp.slice(11,))
    const newTimeIn = {
        'type': 'TimeIn',
        'hour': hour,
        'date': date
    }
    employeeR.timeInEvents.push(newTimeIn)
    return employeeR
}

function createTimeOutEvent(employeeR, dateStamp){
    const date = dateStamp.slice(0,10)
    const hour = parseInt(dateStamp.slice(11,))
    const newTimeOut = {
        'type': 'TimeOut',
        'hour': hour,
        'date': date
    }
    employeeR.timeOutEvents.push(newTimeOut)
    return employeeR
}

function hoursWorkedOnDate(employeeR, dateStamp){
    let hoursWorked
    let hourIn
    let hourOut
    employeeR.timeInEvents.forEach((timeIn)=>{
        if (timeIn.date === dateStamp){
            hourIn = timeIn.hour/100
        }
    })
    employeeR.timeOutEvents.forEach((timeOut)=>{
        if (timeOut.date === dateStamp){
            hourOut = timeOut.hour/100
        }
    })
    hoursWorked = hourOut - hourIn
    return hoursWorked
}

function wagesEarnedOnDate(employeeR, dateStamp){
    const hoursWorked = hoursWorkedOnDate(employeeR, dateStamp)
    const wagesEarned = hoursWorked * employeeR.payPerHour
    return wagesEarned
}

function allWagesFor(employeeR){
    let allDates = []
    let pay = 0
    employeeR.timeOutEvents.forEach((timeOut)=>{
        allDates.push(timeOut.date)
    })
    allDates.forEach((date) => {
        pay = pay + wagesEarnedOnDate(employeeR, date)
    })
    return pay
}

function calculatePayroll(employeeRecArr){
    let totalPayOwed = 0
    employeeRecArr.forEach(employeeR => {
       totalPayOwed += allWagesFor(employeeR)
    })
    return totalPayOwed
}