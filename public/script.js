const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

function loadTasks() {
  fetch('/tasks')
    .then(res => res.json())
    .then(tasks => {
      taskList.innerHTML = '';
      tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${task.name}
          <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
      });
    });
}

taskForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const task = document.getElementById('taskName').value;
  fetch('/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: task })
  }).then(() => {
    taskForm.reset();
    loadTasks();
  });
});

function deleteTask(id) {
  fetch(`/tasks/${id}`, {
    method: 'DELETE'
  }).then(loadTasks);
}

loadTasks();
