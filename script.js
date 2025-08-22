
const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("categorySelect");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterCategory = document.getElementById("filterCategory");
const totalTasksEl = document.getElementById("totalTasks");
const completedTasksEl = document.getElementById("completedTasks");
const incompleteTasksEl = document.getElementById("incompleteTasks");

let tasks = [];

addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    const category = categorySelect.value;

    if (text === "") return;

    const task = {
        id: Date.now(),
        text,
        category,
        completed: false
    };

    tasks.push(task);
    taskInput.value = "";
    renderTasks();
});

filterCategory.addEventListener("change", () => {
    renderTasks();
});

function renderTasks() {
    const selectedCategory = filterCategory.value;
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (selectedCategory !== "all") {
        filteredTasks = tasks.filter(t => t.category === selectedCategory);
    }

    for (const task of filteredTasks) {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
            <span>${task.text} (${task.category})</span> 
            <div> 
                <button onclick="toggleTask(${task.id})">✅</button>
                <button onclick="deleteTask(${task.id})">❌</button>
            </div>
        `;

        taskList.appendChild(li);
    }

    updateStats();
}

function toggleTask(id) {
    for (let task of tasks) {
        if (task.id === id) {
            task.completed = !task.completed;
            break;
        }
    }

    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function updateStats() {
    totalTasksEl.innerText = tasks.length;
    completedTasksEl.innerText = tasks.filter(t => t.completed).length;
    incompleteTasksEl.innerText = tasks.filter(t => !t.completed).length;
}


