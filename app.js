let data = JSON.parse(localStorage.getItem('data')) || [];
loadTasksFromLocStorage();
readAll();

function loadTasksFromLocStorage() {
    const savedData = localStorage.getItem('data');
    if (savedData) {
        data = JSON.parse(savedData);
    }
}

function readAll() {
    let tData = document.getElementById('data');
    let elements = "";
    data.forEach((d, index) => {
        elements += `
            <tr>
                <td>${d.id}</td>
                <td>${d.name}</td>
                <td>${d.employee_code}</td>
                <td>${d.salary}</td>
                <td>
                    <button class="btn btn-primary" onclick="edit(${index})">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-danger" onclick="del(${index})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    tData.innerHTML = elements;
}

function add() {
    let id = document.getElementById('id').value;
    let name = document.getElementById('name').value;
    let employee_code = document.getElementById('employee_code').value;
    let salary = Number(document.getElementById('salary').value);

    if (id.trim() !== '' && name.trim() !== '' && employee_code.trim() !== '' && salary !== 0) {
        let newObject = { id, name, employee_code, salary };
        data.push(newObject);
        localStorage.setItem('data', JSON.stringify(data));

        readAll();

        document.getElementById('id').value = '';
        document.getElementById('name').value = '';
        document.getElementById('employee_code').value = '';
        document.getElementById('salary').value = '';
    } else {
        alert('Please fill in all required fields!');
    }
}

function edit(index) {
    let idInput = document.getElementById('id');
    let nameInput = document.getElementById('name');
    let employee_codeInput = document.getElementById('employee_code');
    let salaryInput = document.getElementById('salary');

    idInput.value = data[index].id;
    nameInput.value = data[index].name;
    employee_codeInput.value = data[index].employee_code;
    salaryInput.value = data[index].salary;

    let addButton = document.getElementById('addButton');
    addButton.innerHTML = 'Update';
    addButton.onclick = function() {
        update(index);
    };
}

function update(index) {
    data[index].id = document.getElementById('id').value;
    data[index].name = document.getElementById('name').value;
    data[index].employee_code = document.getElementById('employee_code').value;
    data[index].salary = Number(document.getElementById('salary').value);

    localStorage.setItem('data', JSON.stringify(data));
    readAll();

    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('employee_code').value = '';
    document.getElementById('salary').value = '';

    let addButton = document.getElementById('addButton');
    addButton.innerHTML = 'Add';
    addButton.onclick = add;
}

function del(index) {
    if (index >= 0 && index < data.length) {
        data.splice(index, 1);
        localStorage.setItem('data', JSON.stringify(data));
        readAll();
    }
}
