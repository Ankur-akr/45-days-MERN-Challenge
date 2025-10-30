const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "db.json");

app.get("/api/projects", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  res.json(data.projects);
});

app.post("/api/projects", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  const newProject = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description,
  };
  data.projects.push(newProject);
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  res.status(201).json(newProject);
});

app.listen(5000, () => console.log("✅ Backend running on port 5000"));
