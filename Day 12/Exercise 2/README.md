# Task Management API

A simple REST API for managing tasks/to-dos using **Express** and **MongoDB (Mongoose)**.  
This was built as **Practice Exercise 2**.

---

## Features
- Create, Read, Update, Delete tasks
- Mark tasks as complete (`/complete`)
- Auto-set `completedAt` when marked complete
- Query filters:
  - `?completed=false` → get pending tasks
  - `?priority=high` → filter by priority
  - `?dueDate=2025-09-01` → filter by due date
  - `?sort=dueDate&order=asc` → sorting
- Analytics endpoint: `/api/tasks/stats`

---
