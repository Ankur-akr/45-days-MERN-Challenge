import React from "react";
import ProjectList from "./ProjectList";
import AddProjectForm from "./AddProjectForm";

function ProjectSection({ projects, onAddProject }) {
  return (
    <div>
      <AddProjectForm onAddProject={onAddProject} />
      <ProjectList projects={projects} />
    </div>
  );
}

export default ProjectSection;
