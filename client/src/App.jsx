import { useEffect, useMemo, useState } from 'react';
import Clock from './components/Clock.jsx';
import TaskForm from './components/TaskForm.jsx';
import Stats from './components/Stats.jsx';
import TaskList from './components/TaskList.jsx';
import { getTasks, createTask, updateTask, removeTask } from './api.js';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(() => setError('Cannot reach the server. Is it running on port 5000?'))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (task) => {
    try {
      const created = await createTask(task);
      setTasks((prev) => [created, ...prev]);
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  const handleToggle = async (task) => {
    try {
      const updated = await updateTask(task.id, { done: !task.done });
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (e) {
      setError(e.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.done).length;
    return { total, done, pending: total - done, percent: total ? Math.round((done / total) * 100) : 0 };
  }, [tasks]);

  const visible = useMemo(() => {
    if (filter === 'pending') return tasks.filter((t) => !t.done);
    if (filter === 'done') return tasks.filter((t) => t.done);
    return tasks;
  }, [tasks, filter]);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          Task<span>Pulse</span>
        </div>
        <Clock />
      </header>

      {error && <div className="error-banner">{error}</div>}

      <main className="layout">
        <TaskForm onAdd={handleAdd} />
        <Stats stats={stats} />
        <TaskList
          tasks={visible}
          filter={filter}
          onFilter={setFilter}
          onToggle={handleToggle}
          onDelete={handleDelete}
          loading={loading}
        />
      </main>
    </div>
  );
}
