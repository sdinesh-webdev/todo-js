// Get references to HTML elements we'll be working with
const taskInput = document.getElementById("todo-input"); // The text input box
const taskList = document.getElementById("todo-list"); // The container for our tasks

// Function that runs when we click "Add Task" button
function addTask() {
  // Get the text from input box and remove extra spaces
  const task = taskInput.value.trim();

  // If input is empty, don't add anything
  if (!task) return;

  // Create a new list item to hold our task
  const newTask = document.createElement("li");
  // Add the task text and buttons inside the list item
  newTask.innerHTML = `
        <span>${task}</span>
        <button onclick="finishTask(this)">Done ✓</button>
        <button onclick="deleteTask(this)">Delete 🗑️</button>
    `;

  // Add the new task to our list
  taskList.appendChild(newTask);

  // Clear the input box for the next task
  taskInput.value = "";
}

// Function to mark a task as finished
function finishTask(button) {
  // Get the parent list item of the clicked button
  const task = button.parentElement;
  // Toggle the 'finished' class to strike through the text
  task.classList.toggle("finished");
}

// Function to remove a task from the list
function deleteTask(button) {
  // Get the parent list item and remove it
  const task = button.parentElement;
  task.remove();
}

// Listen for when Enter key is pressed in the input box
taskInput.addEventListener("keypress", function (e) {
  // If Enter key was pressed, add the task
  if (e.key === "Enter") {
    addTask();
  }
});
