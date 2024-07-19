let myArr = localStorage.getItem("record");
let records = myArr ? JSON.parse(myArr) : [];

let isEdit = false;
let editId = 0;

generateTable();

function handleSubmit(event) {
  event.preventDefault();

  
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;
  const role = document.getElementById("role").value;
  const comments = document.getElementById("comment").value;

  if (isEdit) {
    const index = records.findIndex((x) => x.id === editId);
    const prevObj = records[index];
    prevObj.name = name;
    prevObj.age = age;
    prevObj.role = role;
    prevObj.email = email;

    records[index] = prevObj;
  } else {
    const id = records.length + 1;
    const newObj = {
      name: name,
      email: email,
      age: age,
      role: role,
      comments: comments,
      id: id,
    };

    records.push(newObj);
  }

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("age").value = "";
  document.getElementById("role").value = "";
  document.getElementById("comment").value = "";

  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Age:", age);
  console.log("Role:", role);
  console.log("Comments:", comments);

  generateTable();
}

function generateTable() {
  const myJson = JSON.stringify(records);
  localStorage.setItem("record", myJson);
  const tableBody = document.getElementById("table-body");
  let rows = "";
  records.forEach((record) => {
    rows = `          
        <tr>
            <td>${record.name}</td>
            <td>${record.email}</td>
            <td>${record.age}</td>
            <td>
                <button onclick="editRow(${record.id})">Edit</button>
                <button onclick="deleteRow(${record.id})">Delete</button>
            </td>
        </tr>
    `;
  });
  tableBody.innerHTML = rows;
}

function editRow(id) {
  const record = records.find((editRow) => editRow.id === id);
  if (record) {
    document.getElementById("name").value = record.name;
    document.getElementById("email").value = record.email;
    document.getElementById("age").value = record.age;
    document.getElementById("role").value = record.role;
    document.getElementById("comment").value = record.comments;
  }
  editId = id;
  isEdit = true;
}

function deleteRow(id) {
  records = records.filter((record) => record.id !== id);

  generateTable();
}
