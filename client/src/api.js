const BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.status === 204 ? null : res.json();
}

export const getTasks = () => request('/tasks');
export const createTask = (task) => request('/tasks', { method: 'POST', body: JSON.stringify(task) });
export const updateTask = (id, changes) =>
  request(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(changes) });
export const removeTask = (id) => request(`/tasks/${id}`, { method: 'DELETE' });
