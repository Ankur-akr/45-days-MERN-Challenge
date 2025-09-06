# RESTful Routing Challenge – Resume API

This project is a simple **Express.js API** built to demonstrate **RESTful routing patterns** using resume data.  
It serves **projects** and **work experience** information with proper routing and error handling.

---

## Features
- `GET /api/projects` → Returns all projects with count  
- `GET /api/experience` → Returns all work experiences  
- `GET /api/projects/:id` → Returns a single project by ID  
- Returns **404 Not Found** if project does not exist  

---

## Project Structure
restful-routing/
│── server.js # Express API implementation
│── package.json
│── README.md
