const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");     
const taskList = document.getElementById("taskList"); 
const filterButtons=document.querySelectorAll("[filter-data]");

let tasks = [];

// Add task
function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    alert("Enter a Task!");
    return;
  }

  tasks.push({
    id: Date.now(),
    text,
    completed: false,
    timestamp: new Date().toLocaleString(),
    editing: false
  });

  taskInput.value = "";
  renderTasks();
}

// Render tasks
function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    if (filter === "completed" && !task.completed) return;
    if (filter === "pending" && task.completed) return;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    // Left side
    const leftDiv = document.createElement("div");
    leftDiv.className = "d-flex align-items-center gap-2";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.className = "form-check-input";
    checkbox.addEventListener("change", () =>{ 
      task.completed = checkbox.checked;
      renderTasks(filter);
  });
   //wrapper for text and timestamp
    const textWrapper = document.createElement("div");
    textWrapper.className = "task-wrapper d-flex flex-column";

    let textElement;

    if (task.editing) {
      textElement = document.createElement("input");
      textElement.type = "text";
      textElement.value = task.text;
      textElement.className = "form-control form-control-sm";
      textElement.addEventListener("keypress", e => {
        if (e.key === "Enter") {
          task.text = textElement.value.trim() || task.text;
          task.editing = false;
          renderTasks(filter);
        }
      });
    } else {
      textElement = document.createElement("span");
      textElement.textContent = task.text;
    }

    const time = document.createElement("small");
    time.textContent = task.timestamp;
    time.className = "task-time";

    textWrapper.appendChild(textElement);
    textWrapper.appendChild(time);

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(textWrapper);

    // Right side
    const rightDiv = document.createElement("div");
    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-sm btn-outline-info me-2";
    editBtn.textContent = task.editing ? "Save" : "Edit";

    if (task.completed) {
      editBtn.disabled = true; // disable when task is completed
    } else {
     editBtn.addEventListener("click", () => {
      if (task.editing) {
        task.text = textElement.value.trim() || task.text;
        task.editing = false;
      } else {
        task.editing = true;
      }
      renderTasks(filter);
    });
  }

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm btn-outline-danger";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    rightDiv.appendChild(editBtn);
    rightDiv.appendChild(deleteBtn);

    li.appendChild(leftDiv);
    li.appendChild(rightDiv);

    taskList.appendChild(li);
  });
}


// Delete task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Filter buttons
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    renderTasks(btn.getAttribute("filter-data"));
  });
});

// Events
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

// First render
renderTasks();

