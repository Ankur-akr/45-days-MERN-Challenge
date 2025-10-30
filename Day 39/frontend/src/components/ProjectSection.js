import React, { useState } from "react";
import ProjectList from "./ProjectList";
import AddEditProjectForm from "./AddEditProjectForm";

function ProjectSection({ projects, onAddProject, onUpdateProject }) {
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({ title: "", description: "" });

  const startEdit = (project) => {
    setEditingId(project.id);
    setEditingData({ title: project.title, description: project.description });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingData({ title: "", description: "" });
  };

  const handleUpdate = (id, data) => {
    onUpdateProject(id, data);
    cancelEdit();
  };

  return (
    <div>
      <h3>Add New Project</h3>
      <AddEditProjectForm onSubmit={onAddProject} submitLabel="Add" />
      <h3 style={{marginTop:20}}>Projects</h3>
      <ProjectList
        projects={projects}
        onEdit={startEdit}
      />
      {editingId && (
        <div style={{marginTop:20, padding:10, border:"1px solid #ccc"}}>
          <h3>Edit Project</h3>
          <AddEditProjectForm
            initial={editingData}
            onSubmit={(data)=>handleUpdate(editingId, data)}
            submitLabel="Save"
            onCancel={cancelEdit}
          />
        </div>
      )}
    </div>
  );
}

export default ProjectSection;
