import React, { useState } from "react";

function AddProjectForm({ onAddProject }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    onAddProject({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Add New Project</h3>
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="text"
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddProjectForm;
