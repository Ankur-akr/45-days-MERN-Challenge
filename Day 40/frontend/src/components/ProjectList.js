import React from "react";

function ProjectList({ projects = [], onEdit }) {
  if(!projects.length) return <p style={{padding:12}}>No projects yet.</p>;
  return (
    <ul style={{margin:0,padding:0,listStyle:'none'}}>
      {projects.map((p)=>(
        <li key={p.id} style={{marginBottom:10, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <strong>{p.title}</strong>
            <div style={{color:'#6b7280'}}>{p.description}</div>
          </div>
          <div style={{display:'flex', gap:8}}>
            <button onClick={()=>onEdit && onEdit(p)} className="secondary">Edit</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProjectList;
