const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// CRUD Routes
app.get('/tasks', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM tasks');
  res.json(rows);
});

app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  await db.query('INSERT INTO tasks (title) VALUES (?)', [title]);
  res.status(201).send('Task added');
});

app.put('/tasks/:id', async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  await db.query('UPDATE tasks SET status = ? WHERE id = ?', [status, id]);
  res.send('Task updated');
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM tasks WHERE id = ?', [id]);
  res.send('Task deleted');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
