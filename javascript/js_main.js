// Select the task list and the add task form
const taskList = document.querySelector('#task-list');
const addTaskForm = document.querySelector('#add-task-form');


// Load saved tasks from localStorage or set to an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Define a function to render the task list
function renderTaskList() {
  // Clear the current contents of the task list
  taskList.innerHTML = '';

  // Sort the tasks alphabetically by name
  tasks.sort((a, b) => a.name.localeCompare(b.name));

  // Loop through each task item and append it to the task list
  tasks.forEach((task, index) => {
    // Create a new task element and add the necessary classes
    const taskEl = document.createElement('div');
    taskEl.classList.add('task');
    if (task.completed) {
      taskEl.classList.add('completed');
    }

    // Create a label for the task name
    const taskNameEl = document.createElement('label');
    taskNameEl.textContent = task.name;

    // Create a checkbox for the task completion status
    const taskCompletedEl = document.createElement('input');
    taskCompletedEl.type = 'checkbox';
    taskCompletedEl.checked = task.completed;

    // Create a button for deleting the task
    const deleteButtonEl = document.createElement('button');
    deleteButtonEl.textContent = 'Delete';
    deleteButtonEl.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTaskList();
    });

    // Create a button for editing the task name
    const editButtonEl = document.createElement('button');
    editButtonEl.textContent = 'Edit';
    editButtonEl.addEventListener('click', () => {
      const newTaskName = prompt('Enter the new task name:', task.name);
      if (newTaskName) {
        task.name = newTaskName;
        saveTasks();
        renderTaskList();
      }
    });

    // Append the task name, completion checkbox, edit button, and delete button to the task element
    taskEl.appendChild(taskCompletedEl);
    taskEl.appendChild(taskNameEl);
    taskEl.appendChild(editButtonEl);
    taskEl.appendChild(deleteButtonEl);

    // Add an event listener to the task completion checkbox
    taskCompletedEl.addEventListener('change', () => {
      task.completed = taskCompletedEl.checked;
      taskNameEl.classList.toggle('completed');
      taskEl.classList.toggle('completed');
      saveTasks();
    });

    // Append the task element to the task list
    taskList.appendChild(taskEl);
  });
}

// Define a function to save the tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add an event listener to the add task form submit button
addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the task name and due date from the form inputs
  const taskName = document.querySelector('#task-name').value;
  const dueDate = document.querySelector('#due-date').value;

  // Create a new task object and add it to the tasks array
  const newTask = {
    name: taskName,
    dueDate: dueDate,
    completed: false,
  };
  tasks.push(newTask);

  // Save the updated tasks and render the task list
  saveTasks();
  renderTaskList();

  // Reset the form inputs
  document.querySelector('#task-name').value = '';
  document.querySelector('#due-date').value = '';
});

// Render the task list on page load
renderTaskList();
