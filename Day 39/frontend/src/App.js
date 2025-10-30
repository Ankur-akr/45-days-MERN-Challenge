import React, { useEffect, useState } from "react";
import ProjectSection from "./components/ProjectSection";

function App() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Fetch projects error:", err);
    }
  };

  const addProject = async (project) => {
    await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    fetchProjects();
  };

  const updateProject = async (id, project) => {
    await fetch(`http://localhost:5000/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container" style={{padding:20}}>
      <h1>My Projects</h1>
      <ProjectSection
        projects={projects}
        onAddProject={addProject}
        onUpdateProject={updateProject}
      />
    </div>
  );
}

export default App;
