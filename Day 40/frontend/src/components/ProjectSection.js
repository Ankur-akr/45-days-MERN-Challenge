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
      <div style={{marginBottom:16}} className="projects-add card" >
        <div className="section-header">
          <h3>Add New Project</h3>
        </div>
        <AddEditProjectForm onSubmit={onAddProject} submitLabel="Add" />
      </div>

      <div className="projects-list card" style={{marginTop:12}}>
        <ProjectList
          projects={projects}
          onEdit={startEdit}
        />
      </div>

      {editingId && (
        <div style={{marginTop:12}} className="card">
          <div className="section-header"><h3>Edit Project</h3></div>
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
