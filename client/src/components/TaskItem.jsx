export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.done ? 'done' : ''}`}>
      <div
        className={`task-checkbox ${task.done ? 'checked' : ''}`}
        onClick={() => onToggle(task)}
        role="checkbox"
        aria-checked={task.done}
      />
      <div className="task-body">
        <div className="task-title">{task.title}</div>
        <div className="task-meta">
          <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
          {task.time && <span className="task-time">⏰ {task.time}</span>}
        </div>
      </div>
      <button className="delete-btn" onClick={() => onDelete(task.id)} aria-label="Delete task">
        ×
      </button>
    </li>
  );
}
