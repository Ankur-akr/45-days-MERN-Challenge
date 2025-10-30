import React from "react";

function ProjectList({ projects }) {
  return (
    <ul>
      {projects.map((p) => (
        <li key={p.id}>
          <strong>{p.title}</strong> — {p.description}
        </li>
      ))}
    </ul>
  );
}

export default ProjectList;
