
const openPopupButtons = document.querySelectorAll('.open-popup');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close');


openPopupButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = document.querySelector(button.getAttribute('data-target'));
        target.style.display = "block";
    });
});


closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.modal').style.display = "none";
    });
});


window.addEventListener('click', (event) => {
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});



// Funktion til at indlæse opgaver
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Ryd listen

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        // Tjek om opgaven allerede er markeret som fuldført (streget ud)
        const isCompleted = task.completed ? 'completed' : '';

        li.innerHTML = `
            <span class="task-text ${isCompleted}">${task.text}</span>
            <button class="delete-btn" onclick="toggleCompleteTask(${index})">✔</button>
            <button class="delete-btn" onclick="deleteTask(${index})">Slet</button>
        `;
        taskList.appendChild(li);
    });
}



// Opgave

// Funktion til at indlæse opgaver
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Ryd listen

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        // Tjek om opgaven allerede er markeret som fuldført (streget ud)
        const isCompleted = task.completed ? 'completed' : '';

        li.innerHTML = `
            <span class="task-text ${isCompleted}">${task.text}</span>
            <button class="delete-btn" onclick="toggleCompleteTask(${index})">✔</button>
            <button class="delete-btn" onclick="deleteTask(${index})">Slet</button>
        `;
        taskList.appendChild(li);
    });
}

// Funktion til at tilføje en ny opgave
function addTask() {
    const newTaskInput = document.getElementById('new-task');
    const taskText = newTaskInput.value.trim();

    if (taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = { text: taskText, completed: false }; // Ny opgave med completed-status
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        newTaskInput.value = ''; // Ryd inputfeltet
        loadTasks(); // Opdater listen
    }
}

// Funktion til at slette en opgave
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1); // Fjern opgaven
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks(); // Opdater listen
}

// Funktion til at markere en opgave som fuldført (streget ud)
function toggleCompleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed; // Skift completed-status
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks(); // Opdater listen
}

// Indlæs opgaverne, når siden åbnes
window.onload = loadTasks;
