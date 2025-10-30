import React from "react";

function ProjectList({ projects = [], onEdit }) {
  if(!projects.length) return <p>No projects yet.</p>;
  return (
    <ul>
      {projects.map((p)=>(
        <li key={p.id} style={{marginBottom:10}}>
          <strong>{p.title}</strong> — {p.description}
          <div style={{display:"inline-block", marginLeft:10}}>
            <button onClick={()=>onEdit && onEdit(p)}>Edit</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProjectList;
