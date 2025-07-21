const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const submitBtn = document.getElementById('submitBtn');

let id = -1;

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let output = "";

    for (let i = 0; i < tasks.length; i++) {
        output += `
        <div class="task">
          <h3>Task Title: ${tasks[i].title}</h3>
          <p><strong>Date:</strong> ${tasks[i].date}</p>
          <p><strong>Priority:</strong> ${tasks[i].priority}</p>
          <p>Task Description: ${tasks[i].description}</p>
          <button class="edit-btn" onclick="editTask(${i})">Edit</button>
          <button class="delete-btn" onclick="deleteTask(${i})">Delete</button>
        </div>`;
    }

    taskList.innerHTML = output;
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.splice(index, 1);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks[index];

    document.getElementById('title').value = task.title;
    document.getElementById('date').value = task.date;
    document.getElementById('priority').value = task.priority;
    document.getElementById('description').value = task.description;

    id = index;
    submitBtn.textContent = 'Update Task';
}

taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const priority = document.getElementById('priority').value;
    const description = document.getElementById('description').value;

    const task = { title, date, priority, description };
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (id >= 0) {
        tasks[id] = task;
        id = -1;
        submitBtn.textContent = 'Add Task';
    } else {
        tasks.push(task);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskForm.reset();
    loadTasks();
});

loadTasks();
