// server/index.js
const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/get/tickets', (req, res) => {
  db.all('SELECT * FROM tickets ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.post('/api/save/ticket', (req, res) => {
  const { type, priority, description, reporter, assignees } = req.body;
  db.run(
    `INSERT INTO tickets (type, priority, description, reporter, assignees) VALUES (?, ?, ?, ?, ?)`,
    [type, priority, description, reporter, Array.isArray(assignees) ? assignees.join(',') : assignees],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      db.get('SELECT * FROM tickets WHERE id = ?', [this.lastID], (err, row) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json(row);
      });
    }
  );
});

app.patch('/api/update/ticket/:id', (req, res) => {
  const { id } = req.params;
  const { type, priority, description, reporter, assignees, status } = req.body;
  db.run(
    `UPDATE tickets SET type = ?, priority = ?, description = ?, reporter = ?, assignees = ?, status = ? WHERE id = ?`,
    [type, priority, description, reporter, Array.isArray(assignees) ? assignees.join(',') : assignees, status, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      db.get('SELECT * FROM tickets WHERE id = ?', [id], (err, row) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json(row);
      });
    }
  );
});

app.listen(4000, () => console.log('API running on http://localhost:4000'));