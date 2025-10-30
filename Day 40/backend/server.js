const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "db.json");

function readDB(){
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}
function writeDB(data){
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

app.get("/api/projects", (req, res) => {
  const data = readDB();
  res.json(data.projects);
});

app.post("/api/projects", (req, res) => {
  const data = readDB();
  const newProject = {
    id: Date.now(),
    title: req.body.title || "Untitled",
    description: req.body.description || ""
  };
  data.projects.push(newProject);
  writeDB(data);
  res.status(201).json(newProject);
});

app.put("/api/projects/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = readDB();
  const idx = data.projects.findIndex(p => p.id === id);
  if(idx === -1) return res.status(404).json({ error: "Project not found" });
  const updated = {
    ...data.projects[idx],
    title: req.body.title ?? data.projects[idx].title,
    description: req.body.description ?? data.projects[idx].description
  };
  data.projects[idx] = updated;
  writeDB(data);
  res.json(updated);
});

app.listen(5000, () => console.log("✅ Backend running on port 5000"));
