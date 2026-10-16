
const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const message = document.getElementById("message");

// Load student records from localStorage
let students = JSON.parse(
    localStorage.getItem("students")
) || [];

// Save records as JSON and display them
function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

// Display all students in the HTML table
function displayStudents() {
    table.innerHTML = "";

    students.forEach(function(student) {
        const row = document.createElement("tr");

        [student.id, student.name, student.course, student.marks]
            .forEach(function(value) {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            deleteStudent(student.id);
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        table.appendChild(row);
    });
}

// Add a new student
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.getElementById("studentId").value.trim();
    const name = document.getElementById("studentName").value.trim();
    const course = document.getElementById("course").value.trim();
    const marks = Number(document.getElementById("marks").value);

    // Check for duplicate student ID
    if (students.some(student => student.id === id)) {
        message.textContent = "Student ID already exists!";
        return;
    }

    if (marks < 0 || marks > 100) {
        message.textContent = "Marks must be between 0 and 100.";
        return;
    }

    const student = {
        id: id,
        name: name,
        course: course,
        marks: marks
    };

    students.push(student);
    saveStudents();

    form.reset();
    message.textContent = "Student added successfully!";
});

// Delete a student using their ID
function deleteStudent(id) {
    students = students.filter(function(student) {
        return student.id !== id;
    });

    saveStudents();
    message.textContent = "Student deleted successfully!";
}

// Display saved records when the page opens
displayStudents();
