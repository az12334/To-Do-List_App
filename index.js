// Element references
const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const toggleDarkHeader = document.getElementById("toggleDarkHeader");

// Load tasks from localStorage
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(t => createTaskElement(t.text, t.priority, t.completed));
};

// Save all tasks
function saveTasks() {
  const tasks = Array.from(document.querySelectorAll(".task")).map(li => ({
    text: li.querySelector("span").textContent,
    priority: li.dataset.priority,
    completed: li.classList.contains("completed")
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Create Task Element
function createTaskElement(text, priority, completed = false) {
  const li = document.createElement("li");
  li.className = `task ${priority.toLowerCase()}`;
  li.setAttribute("data-priority", priority);
  if (completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = text;
  li.appendChild(span);

  const completeBtn = document.createElement("button");
  completeBtn.className = "completeBtn";
  completeBtn.textContent = "✔️";
  completeBtn.onclick = () => {
    li.classList.toggle("completed");
    saveTasks();
  };
  li.appendChild(completeBtn);

  taskList.appendChild(li);
  li.classList.add("bounceIn");
  saveTasks();
}

// Add new task
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (!text) {
    alert("📌 Please enter a task first!");
    taskInput.focus();
    return;
  }

  if (taskList.children.length >= 3) {
    alert("🚫 Task limit reached! Only 3 allowed.");
    return;
  }

  createTaskElement(`${text} (${priority})`, priority);
  taskInput.value = "";
});

// Filter logic
document.querySelectorAll(".filterBtn").forEach(btn =>
  btn.addEventListener("click", () => {
    const type = btn.dataset.filter;
    document.querySelectorAll("#taskList li").forEach(li => {
      const isDone = li.classList.contains("completed");
      li.style.display =
        type === "all" ||
        (type === "completed" && isDone) ||
        (type === "pending" && !isDone)
          ? "flex" : "none";
    });
  })
);

// Delete all
deleteAllBtn.addEventListener("click", () => {
  if (confirm("🗑️ Delete all tasks?")) {
    taskList.innerHTML = "";
    saveTasks();
  }
});

// Dark mode toggle
toggleDarkHeader.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});