import React, { useEffect, useState } from "react";
import ProjectSection from "./components/ProjectSection";

function App() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const res = await fetch("http://localhost:5000/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  const addProject = async (project) => {
    await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container">
      <h1>My Projects</h1>
      <ProjectSection projects={projects} onAddProject={addProject} />
    </div>
  );
}

export default App;
