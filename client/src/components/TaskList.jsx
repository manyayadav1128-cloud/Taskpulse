import TaskItem from './TaskItem.jsx';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'done', label: 'Done' },
];

export default function TaskList({ tasks, filter, onFilter, onToggle, onDelete, loading }) {
  return (
    <section className="card list-card">
      <div className="list-head">
        <h2>Tasks</h2>
        <div className="filters">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`filter-btn ${filter === f.key ? 'active' : ''}`}
              onClick={() => onFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </ul>

      {!loading && tasks.length === 0 && (
        <p className="empty-state" style={{ display: 'block' }}>
          No tasks yet — add one above to get started.
        </p>
      )}
    </section>
  );
}
