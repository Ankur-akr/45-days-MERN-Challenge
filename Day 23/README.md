# Day 23: useEffect and Data Fetching - MERN Stack Ascent

This project demonstrates how to use React's `useEffect` hook to fetch data from an Express.js backend API.

## 📂 Project Structure

```
day23_useEffect_fetching_with_pkg/
│── backend/        # Express.js API server
│   ├── server.js
│   └── package.json
│
│── frontend/       # React frontend app
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── components/
│   │       ├── ProjectList.js
│   │       ├── Loader.js
│   │       └── ErrorMessage.js
│   └── package.json
```

---

## 🚀 How to Run

### 1. Clone and unzip the project
```bash
unzip day23_useEffect_fetching_with_pkg.zip
cd day23_useEffect_fetching_with_pkg
```

### 2. Run the Backend (Express API)
```bash
cd backend
npm install
npm start
```
Server will start at 👉 `http://localhost:5000`

### 3. Run the Frontend (React App)
In a **new terminal**:
```bash
cd frontend
npm install
npm start
```
React app will run at 👉 `http://localhost:3000`

---

## 📚 Features
- **useEffect Hook** → fetch projects on mount  
- **Loading State** → shows spinner while fetching  
- **Error Handling** → displays errors gracefully  
- **Refresh Button** → re-fetch data from API  
- **Component-based UI** → clean separation (`ProjectList`, `Loader`, `ErrorMessage`)  

---

## 🛠 Tech Stack
- **Frontend**: React 18, Tailwind CSS (optional styling)  
- **Backend**: Node.js, Express.js, CORS  

---

## 🎯 Endpoints
- **GET /api/projects** → returns list of projects  

Example response:
```json
[
  { "id": 1, "name": "Portfolio Website", "description": "Personal portfolio" },
  { "id": 2, "name": "E-commerce App", "description": "Full MERN stack store" },
  { "id": 3, "name": "Blog Platform", "description": "Blogging with comments" }
]
```

---

✅ Now you can connect React frontend with your Express backend and fetch data easily!
