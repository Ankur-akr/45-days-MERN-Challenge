# Day 37 – Adding New Projects from the UI

This project is part of the **MERN Stack Ascent Challenge (Day 37)**.  
The goal is to enable adding new projects directly from the **frontend UI**, sending data to the backend API, and dynamically refreshing the project list.

---

## 🚀 Project Overview

- **Frontend:** React (Create React App)
- **Backend:** Node.js + Express
- **Database:** JSON file (mock database)
- **Goal:** Demonstrate “Lifting State Up” — passing functions from parent to child to manage API operations cleanly.

---

## 🧠 Core Concepts

- **Lifting State Up:**  
  Pass the API-handling function (`addProject`) from the parent (`App` or `<ProjectSection>`) to the child (`<AddProjectForm>`).

- **Data Refresh:**  
  After adding a new project, the parent fetches the latest list from the API to re-render the UI.

- **Component Composition:**  
  Clean separation between components:
  - `<ProjectSection>` – combines list and form  
  - `<AddProjectForm>` – handles user input and form submission  
  - `<ProjectList>` – displays fetched projects  

---

## 🗂 Folder Structure

Day37/
│
├── backend/
│ ├── server.js
│ ├── db.json
│ └── package.json
│
└── frontend/
├── package.json
├── public/
│ └── index.html
└── src/
├── index.js
├── App.js
└── components/
├── AddProjectForm.js
├── ProjectList.js
└── ProjectSection.js
