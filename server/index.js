const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data', 'tasks.json');
const PRIORITIES = ['low', 'medium', 'high'];

app.use(cors());
app.use(express.json());

// ===== Tiny JSON-file "database" =====
function readTasks() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return [];
  }
}
function writeTasks(tasks) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// ===== Routes =====
// GET /api/tasks?status=all|pending|done
app.get('/api/tasks', (req, res) => {
  const { status } = req.query;
  let tasks = readTasks();
  if (status === 'pending') tasks = tasks.filter((t) => !t.done);
  if (status === 'done') tasks = tasks.filter((t) => t.done);
  res.json(tasks);
});

// GET /api/stats
app.get('/api/stats', (_req, res) => {
  const tasks = readTasks();
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  res.json({
    total,
    done,
    pending: total - done,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
  });
});

// POST /api/tasks
app.post('/api/tasks', (req, res) => {
  const title = String(req.body.title || '').trim();
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const priority = PRIORITIES.includes(req.body.priority) ? req.body.priority : 'medium';
  const task = {
    id: Date.now(),
    title,
    priority,
    time: req.body.time || '',
    done: false,
    createdAt: new Date().toISOString(),
  };

  const tasks = readTasks();
  tasks.unshift(task);
  writeTasks(tasks);
  res.status(201).json(task);
});

// PATCH /api/tasks/:id  (toggle done or edit fields)
app.patch('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const tasks = readTasks();
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });

  const { title, priority, time, done } = req.body;
  if (typeof title === 'string' && title.trim()) tasks[idx].title = title.trim();
  if (PRIORITIES.includes(priority)) tasks[idx].priority = priority;
  if (typeof time === 'string') tasks[idx].time = time;
  if (typeof done === 'boolean') tasks[idx].done = done;

  writeTasks(tasks);
  res.json(tasks[idx]);
});

// DELETE /api/tasks/:id
app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const tasks = readTasks();
  if (!tasks.some((t) => t.id === id)) return res.status(404).json({ error: 'Task not found' });
  writeTasks(tasks.filter((t) => t.id !== id));
  res.status(204).end();
});

// ===== Serve built React app in production =====
const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (_req, res) => res.sendFile(path.join(clientDist, 'index.html')));
}

app.listen(PORT, () => console.log(`TaskPulse server running on http://localhost:${PORT}`));
