import { useRef, useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [time, setTime] = useState('');
  const titleRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onAdd({ title: title.trim(), priority, time });
    setTitle('');
    setPriority('medium');
    setTime('');
    titleRef.current?.focus();
  };

  return (
    <section className="card add-card">
      <h2>New Task</h2>
      <form id="taskForm" onSubmit={handleSubmit}>
        <input
          ref={titleRef}
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div className="row">
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low priority</option>
            <option value="medium">Medium priority</option>
            <option value="high">High priority</option>
          </select>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <button type="submit" className="btn-primary">
          Add Task
        </button>
      </form>
    </section>
  );
}
