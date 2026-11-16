# TaskPulse — React + Node.js

A real-time task manager converted from plain HTML/CSS/JS to a React front end and an Express (Node.js) REST API.

## Structure
```
taskpulse/
├── server/            Express API (tasks saved in server/data/tasks.json)
│   └── index.js
└── client/            React app (Vite)
    └── src/
        ├── App.jsx
        ├── api.js
        └── components/ (Clock, TaskForm, Stats, TaskList, TaskItem)
```

## Setup
Requires Node.js 18+.

```bash
npm run install:all     # installs root, server and client dependencies
npm run dev             # API on :5000, React on http://localhost:5173
```

## Production
```bash
npm run build           # builds React into client/dist
npm start               # Express serves API + built app on http://localhost:5000
```

## API
| Method | Route          | Description                          |
|--------|----------------|--------------------------------------|
| GET    | /api/tasks     | List tasks (?status=pending or done) |
| GET    | /api/stats     | Total / done / pending / percent     |
| POST   | /api/tasks     | Create {title, priority, time}       |
| PATCH  | /api/tasks/:id | Update title, priority, time, done   |
| DELETE | /api/tasks/:id | Delete a task                        |
