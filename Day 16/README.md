# Day 16 – Combined API System (MERN Stack Ascent)

This project is part of the **MERN Stack Ascent Challenge** (Day 16), where we combine multiple APIs into a **unified, multi-resource system** with advanced queries and cross-resource relationships.

## Features
- **Unified Endpoints**
  - `GET /api/profile/dashboard` – quick stats (users, projects, experience)
  - `GET /api/profile/portfolio?userId=` – detailed portfolio view
  - `GET /api/search?q=` – cross-resource search

- **Analytics Endpoints**
  - `GET /api/analytics/skills` – most used skills/technologies
  - `GET /api/analytics/career` – work experience by company
  - `GET /api/analytics/technology` – project technology trends

- **Advanced Queries**
  - Cross-resource queries (users, projects, experiences, skills)
  - Flexible filtering
  - Aggregation pipelines for analytics

## Project Structure
combined-api/
├── models/ # Mongoose models (User, Project, Experience, Skill, Technology)
├── routes/ # Express routes (profile, search, analytics)
├── middleware/ # Error handler
├── frontend/ # Simple demo frontend (HTML + JS)
├── server.js # Main server
└── package.json
