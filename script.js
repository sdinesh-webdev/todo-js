// Now i select the input and list element here.
/*
 * Get references to our main DOM elements:
 * - todoInput: the text input field where users type new tasks
 * - todoListContainer: the ul element that will hold all todo items
 */
const todoInput = document.getElementById("todo-input");
const todoListContainer = document.getElementById("todo-list");

/*
 * When the page loads:
 * 1. Try to get saved todos from localStorage
 * 2. If nothing is saved yet, use an empty array
 * 3. For each saved todo, create and display it on the page
 */
window.onload = () => {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach((todoText) => createTodoItem(todoText));
};

/*
 * Function that runs when "Add Task" button is clicked:
 * 1. Get the text from input and remove extra spaces
 * 2. If text is empty, do nothing
 * 3. Otherwise, create new todo item and save all todos
 * 4. Clear the input field for next entry
 */
function addTodoItem() {
  //here i use trim()method to remove white space from begnning & end of string
  const todoText = todoInput.value.trim();

  // here i applying condition
  if (!todoText) return;

  createTodoItem(todoText);
  saveTodoItems();
  todoInput.value = "";
}

/*
 * Function that creates a new todo item:
 * 1. Create a new list item element
 * 2. Set its text content to the todo text
 * 3. Add click handler to toggle completion status
 * 4. Create and add delete button (❌)
 * 5. Add the new item to the list container
 */
function createTodoItem(todoText) {
  // creating new element to list input values
  const todoItem = document.createElement("listItem");
  todoItem.textContent = todoText;

  // Add click handler to toggle completion
  todoItem.onclick = () => {
    todoItem.classList.toggle("completed");
    saveTodoItems();
  };

  //deleting todo
  const deleteButton = document.createElement("span");
  deleteButton.textContent = "❌";
  deleteButton.className = "delete-button";
  deleteButton.style.cursor = "pointer";

  // Add click handler for deletion
  deleteButton.onclick = (event) => {
    event.stopPropagation();
    todoItem.remove();
    saveTodoItems();
  };

  todoItem.appendChild(deleteButton);
  todoListContainer.appendChild(todoItem);
}

/*
 * Function to save todos to localStorage:
 * 1. Get all todo items from the list
 * 2. Convert them to an array of text content
 * 3. Remove the ❌ symbol and extra spaces
 * 4. Save the array to localStorage as JSON
 */
function saveTodoItems() {
  const todoItems = Array.from(todoListContainer.children).map((todoItem) => {
    return todoItem.textContent.replace("❌", "").trim();
  });
  localStorage.setItem("todos", JSON.stringify(todoItems));
}
