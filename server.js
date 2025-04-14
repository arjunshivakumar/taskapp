const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,  // Cloud SQL Public IP
  user: 'root',
  password: process.env.DB_PASS,
  database: 'taskdb'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// CRUD Endpoints
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  db.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, title, description, completed: false });
  });
});

app.put('/tasks/:id', (req, res) => {
  const { completed } = req.body;
  db.query('UPDATE tasks SET completed = ? WHERE id = ?', [completed, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

app.delete('/tasks/:id', (req, res) => {
  db.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
