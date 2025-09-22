import React from 'react';

function ProjectCard({ title, description, technologies }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '8px', borderRadius: '8px' }}>
      <h3 style={{ margin: '0 0 8px 0' }}>{title}</h3>
      <p style={{ margin: '0 0 12px 0' }}>{description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {technologies.map((tech, index) => (
          <span key={index} style={{ background: '#e0e0e0', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProjectCard;