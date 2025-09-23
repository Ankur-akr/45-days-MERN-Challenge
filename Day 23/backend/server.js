const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());

// Sample data
const projects = [
  { id: 1, name: "Portfolio Website", description: "Personal portfolio" },
  { id: 2, name: "E-commerce App", description: "Full MERN stack store" },
  { id: 3, name: "Blog Platform", description: "Blogging with comments" }
];

app.get("/api/projects", (req, res) => {
  res.json(projects);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
