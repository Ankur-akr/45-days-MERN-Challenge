import React, { useEffect, useState } from "react";
import ProjectSection from "./components/ProjectSection";
import './index.css';

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
    <div className="container">
      <header className="site-header">
        <div className="avatar">AR</div>
        <div className="title">
          <h1>Ankur Rai — MERN Stack Developer</h1>
          <p>React • Node • Express • Responsive UI</p>
        </div>
      </header>

      <div className="grid-2">
        <main>
          <div className="card">
            <div className="section-header">
              <h3>Projects</h3>
            </div>
            <ProjectSection
              projects={projects}
              onAddProject={addProject}
              onUpdateProject={updateProject}
            />
          </div>
        </main>

        <aside>
          <div className="card">
            <h3>Contact</h3>
            <p>an example contact card — add your details</p>
          </div>
          <div className="card" style={{marginTop:12}}>
            <h3>Skills</h3>
            <p>React · Node · Express · CSS · Flexbox · Grid</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
