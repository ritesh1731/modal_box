var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);}
        else{
            updateRecord(formData);}
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["rollnumber"] = document.getElementById("rollnumber").value;
    formData["firstname"] = document.getElementById("firstname").value;
    document.querySelectorAll('#gender').forEach((item) => {
        if (item.checked){
            formData["gender"] = item.value;
        }
    })
    formData["standard"] = document.getElementById("standard").value;
    formData["birthdate"] = document.getElementById("birthdate").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("studentList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.rollnumber;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.firstname;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.gender;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.standard;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.birthdate;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<button class="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onClick="onEdit(this)">Edit</button>`;
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = `<button class="btn btn-success" onClick="onDelete(this)">Delete</button>`;
}

function resetForm() {
    document.getElementById("rollnumber").value = "";
    document.getElementById("firstname").value = "";
    document.querySelectorAll('#gender').forEach((item) => {
        if (item.checked){
            item.checked = false;
        }
    })
    // document.getElementById("gender").value = "";
    document.getElementById("standard").value = "";
    document.getElementById("birthdate").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("rollnumber").value = selectedRow.cells[0].innerHTML;
    console.log(selectedRow.cells[0].innerHTML)
    document.getElementById("firstname").value = selectedRow.cells[1].innerHTML;
    document.querySelector("."+selectedRow.cells[2].innerHTML).checked = true;
    document.getElementById("standard").value = selectedRow.cells[3].innerHTML;
    document.getElementById("birthdate").value = selectedRow.cells[4].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.rollnumber;
    selectedRow.cells[1].innerHTML = formData.firstname;
    selectedRow.cells[2].innerHTML = formData.gender;
    selectedRow.cells[3].innerHTML = formData.standard;
    selectedRow.cells[4].innerHTML = formData.birthdate;
}

function onDelete(td) {
    if (confirm('Are you sure u want to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("studentList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("firstname").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}
