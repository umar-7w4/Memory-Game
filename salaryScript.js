
function cal(hoursWorked){
    const hourlyWage = 15;
    const regularHours = Math.min(hoursWorked, 40);
    const overtimeHours = Math.max(hoursWorked - 40, 0);
    const overtimeRate = 1.5;
    const pay = (regularHours * hourlyWage) + (overtimeHours * hourlyWage * overtimeRate);
    return pay;
}

function call() {
    let totalPay = 0;
    let id = 0;
    const emp = document.getElementById("datacell");
    const sum = document.getElementById("datafoot");
    while (true) {
        let hours = prompt("Enter the number of hours worked or -1 to exit:", "Hours Worked");
        if (hours === null || hours.trim() === "" || isNaN(hours)) {
            alert("Invalid input. Please enter a valid number of hours or -1 to finish.");
            continue;
        }
        const h = parseFloat(hours);
        if(h === -1){
            break;
        }
        id += 1;
        const pay = cal(h);
        
        const row = emp.insertRow();
        const idemp = row.insertCell(0);
        const hrs = row.insertCell(1);
        const payemp = row.insertCell(2);
        idemp.textContent = id;
        hrs.textContent = h;
        payemp.textContent = `$${pay.toFixed(2)}`;

        totalPay += pay;
    }
    const row1 = sum.insertRow();
    const summary = row1.insertCell(0);
    const total = row1.insertCell(1);
    const value = row1.insertCell(2);
    summary.textContent = "Summary:";
    total.textContent = "Total Pay -";
    value.textContent = `$${totalPay.toFixed(2)}`;
}

call();
