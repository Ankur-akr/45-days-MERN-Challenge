# Day 31: Project Scaffolding & API Finalization (MERN Stack Ascent)

## 🚀 Overview
This project sets up a clean, scalable Express API for Projects, Experience, and Skills — the core backend of your MERN portfolio app.

## 📂 Folder Structure
- `/server` — backend with routes, controllers, and middleware setup
- `/routes` — separate route files for each resource
- `/controllers` — business logic and CRUD handlers

## 🧠 Features
- Organized project scaffolding
- RESTful API design
- CRUD endpoints for Projects, Experience, and Skills
- Ready for MongoDB integration

## 🧪 API Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | /api/projects | Get all projects |
| POST | /api/projects | Create a new project |
| PUT | /api/projects/:id | Update a project |
| DELETE | /api/projects/:id | Delete a project |
| (Similarly for `/api/experience` and `/api/skills`) |

## 🛠 Setup
```bash
cd server
npm install
npm run dev
```

Server runs on `http://localhost:5000`.

## 🧰 Tech Stack
- Node.js + Express
- REST API
- CORS & Morgan for middleware
- Postman for testing

---
**Next Step:** Integrate MongoDB & connect the React frontend for the full MERN experience!
