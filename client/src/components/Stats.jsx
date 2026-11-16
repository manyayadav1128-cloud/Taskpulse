export default function Stats({ stats }) {
  const { total, done, pending, percent } = stats;
  return (
    <section className="card stats-card">
      <h2>Today's Progress</h2>
      <div className="stats-grid">
        <div className="stat">
          <div className="stat-num">{total}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat">
          <div className="stat-num">{done}</div>
          <div className="stat-label">Done</div>
        </div>
        <div className="stat">
          <div className="stat-num">{pending}</div>
          <div className="stat-label">Pending</div>
        </div>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="progress-text">{percent}% complete</div>
    </section>
  );
}
