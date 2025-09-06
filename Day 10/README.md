# Projects CRUD API (Node.js + Express + MongoDB v4)

A complete **CRUD API** built with **Express.js** and **MongoDB**.  
This API manages **projects** in the `resumeData` database with proper **RESTful routing**.

---

## Features
- **Create** → Add a new project (`POST /api/projects`)  
- **Read** → Get all projects (`GET /api/projects`) or one by ID (`GET /api/projects/:id`)  
- **Update** → Edit project details by ID (`PUT /api/projects/:id`)  
- **Delete** → Remove a project by ID (`DELETE /api/projects/:id`)  
- Proper error handling for invalid/missing IDs  

---

## Project Structure
crud-projects-api/
│── server.js # Main API implementation
│── package.json
│── README.md
