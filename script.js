let data = []; 
const dataTable = document.getElementById('dataTable');
const formContainer = document.getElementById('formContainer');
const form = document.getElementById('crudForm');
const dataBody = document.getElementById('dataBody');
const btnShowCreateForm = document.getElementById('btnShowCreateForm');
const btnCancel = document.getElementById('btnCancel');
const formTitle = document.getElementById('formTitle');
let editIndex = null;

// Mostrar tabla
function displayTable() {
    dataBody.innerHTML = data.map((item, index) => `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.oficio}</td>
            <td>
                <button class="btn primary" onclick="editRecord(${index})"><i class="fas fa-edit"></i></button>
                <button class="btn danger" onclick="deleteRecord(${index})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

// Crear/Actualizar Registro
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newData = {
        id: form.id.value,
        name: form.name.value,
        email: form.email.value,
        oficio: form.oficio.value
    };

    if (editIndex !== null) {
        data[editIndex] = newData;
        editIndex = null;
    } else {
        data.push(newData);
    }

    form.reset();
    toggleForm(false);
    displayTable();
});

// Crear Registro
btnShowCreateForm.addEventListener('click', () => {
    formTitle.innerText = 'Nuevo Registro';
    form.reset();
    toggleForm(true);
});

// Cancelar 
btnCancel.addEventListener('click', () => toggleForm(false));

// Mostrar/Ocultar formulario
function toggleForm(show) {
    formContainer.classList.toggle('hidden', !show);
    dataTable.classList.toggle('hidden', show);
}

// Editar Registro
function editRecord(index) {
    formTitle.innerText = 'Actualizar Registro';
    form.id.value = data[index].id;
    form.name.value = data[index].name;
    form.email.value = data[index].email;
    form.oficio.value = data[index].oficio;
    editIndex = index;
    toggleForm(true);
}

// Eliminar Registro
function deleteRecord(index) {
    data.splice(index, 1);
    displayTable();
}

displayTable();
