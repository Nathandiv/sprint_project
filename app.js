// Function to read all employees from the backend and populate the table
async function readAll() {
    try {
        const response = await fetch('http://localhost:3002/get');
        const data = await response.json();

        let tData = document.getElementById('data');
        let elements = "";

        data.forEach((d) => {
            elements += `
                <tr>
                    <td>${d.id}</td>
                    <td>${d.name}</td>
                    <td>${d.employee_code}</td>
                    <td>${d.salary}</td>
                    <td>
                        <button class="btn btn-primary" onclick="edit(${d.id})" data-bs-toggle="modal" data-bs-target="#myModal">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="btn btn-danger" onclick="del(${d.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        tData.innerHTML = elements;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
async function addOrUpdate() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const employee_code = document.getElementById('employee_code').value;
    const salary = Number(document.getElementById('salary').value);

    console.log("ID:", id);
    console.log("Name:", name);
    console.log("Employee Code:", employee_code);
    console.log("Salary:", salary);

    if (id.trim() !== '' && name.trim() !== '' && employee_code.trim() !== '' && salary !== 0) {
        const newObject = { id, name, employee_code, salary };
        const submitBtn = document.getElementById('submitBtn');

        try {
            if (submitBtn.getAttribute('data-mode') === 'add') {
                console.log("Sending POST request...");
                const response = await fetch('http://localhost:3002/post', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newObject)
                });
                console.log("Response:", response);
            } else if (submitBtn.getAttribute('data-mode') === 'edit') {
                console.log("Sending PUT request...");
                const response = await fetch(`http://localhost:3002/put/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newObject)
                });
                console.log("Response:", response);
            }
            resetForm();
            readAll();
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    } else {
        alert('Please fill in all required fields!');
    }
}




// reset 
function resetForm() {
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('employee_code').value = '';
    document.getElementById('salary').value = '';

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerHTML = 'Submit';
    submitBtn.setAttribute('data-mode', 'add');
    submitBtn.onclick = addOrUpdate;
}

//  edit 
async function edit(id) {
    try {
        const response = await fetch(`http://localhost:3002/get/${id}`);
        const data = await response.json();

        if (data.length > 0) {
            const employee = data[0];
            document.getElementById('id').value = employee.id;
            document.getElementById('name').value = employee.name;
            document.getElementById('employee_code').value = employee.employee_code;
            document.getElementById('salary').value = employee.salary;

            const submitBtn = document.getElementById('submitBtn');
            submitBtn.innerHTML = 'Update';
            submitBtn.setAttribute('data-mode', 'edit');
            submitBtn.onclick = addOrUpdate;
        }
    } catch (error) {
        console.error('Error fetching employee data:', error);
    }
}

// delete
async function del(id) {
    try {
        await fetch(`http://localhost:3002/delete/${id}`, {
            method: 'DELETE'
        });
        readAll();
    } catch (error) {
        console.error('Error deleting data:', error);
    }
}

document.getElementById('myModal').addEventListener('hidden.bs.modal', resetForm);

readAll();
