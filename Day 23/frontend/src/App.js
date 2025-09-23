import React, { useState, useEffect } from "react";
import ProjectList from "./components/ProjectList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []); // runs only once on mount

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📂 Project Dashboard</h1>

      <button
        onClick={fetchProjects}
        className="px-4 py-2 mb-4 bg-blue-600 text-white rounded-lg"
      >
        Refresh Projects 🔄
      </button>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && <ProjectList projects={projects} />}
    </div>
  );
}

export default App;
