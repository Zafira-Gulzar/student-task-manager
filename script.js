// Student Task Manager JavaScript

let tasks = [];

const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const addTaskBtn = document.getElementById("addTaskBtn");
const searchTask = document.getElementById("searchTask");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

// Add a new task
addTaskBtn.addEventListener("click", function () {
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();

    if (title === "") {
        alert("Please enter a task title.");
        return;
    }

    const task = {
        id: Date.now(),
        title: title,
        description: description,
        completed: false
    };

    tasks.push(task);

    taskTitle.value = "";
    taskDescription.value = "";

    displayTasks();
});

// Display tasks
function displayTasks() {
    const searchText = searchTask.value.toLowerCase();

    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchText) ||
        task.description.toLowerCase().includes(searchText)
    );

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `
            <p class="no-task">No tasks found.</p>
        `;
        updateStats();
        return;
    }

    filteredTasks.forEach(task => {
        const taskCard = document.createElement("div");

        taskCard.className = "task-card";

        if (task.completed) {
            taskCard.classList.add("completed");
        }

        taskCard.innerHTML = `
            <div class="task-content">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <span class="task-status">
                    ${task.completed ? "Completed" : "Pending"}
                </span>
            </div>

            <div class="task-actions">
                <button onclick="completeTask(${task.id})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(taskCard);
    });

    updateStats();
}

// Complete / undo task
function completeTask(id) {
    const task = tasks.find(task => task.id === id);

    if (task) {
        task.completed = !task.completed;
    }

    displayTasks();
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    displayTasks();
}

// Search tasks
searchTask.addEventListener("input", function () {
    displayTasks();
});

// Update statistics
function updateStats() {
    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
}

// Initial display
displayTasks();
