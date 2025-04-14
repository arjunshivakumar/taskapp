async function loadTasks() {
    const res = await fetch('/tasks');
    const tasks = await res.json();
    const list = document.getElementById('task-list');
    list.innerHTML = '';
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.innerText = `${task.title} (${task.status})`;
      li.onclick = () => updateTask(task.id);
      const del = document.createElement('button');
      del.innerText = 'Delete';
      del.onclick = e => {
        e.stopPropagation();
        deleteTask(task.id);
      };
      li.appendChild(del);
      list.appendChild(li);
    });
  }
  
  async function addTask() {
    const title = document.getElementById('new-task').value;
    await fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    loadTasks();
  }
  
  async function updateTask(id) {
    await fetch(`/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'done' })
    });
    loadTasks();
  }
  
  async function deleteTask(id) {
    await fetch(`/tasks/${id}`, { method: 'DELETE' });
    loadTasks();
  }
  
  loadTasks();
  