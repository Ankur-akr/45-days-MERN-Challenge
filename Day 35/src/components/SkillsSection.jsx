import React from 'react';

const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Git'];

const SkillsSection = () => (
  <section style={{ marginBottom: '40px' }}>
    <h2>Skills</h2>
    <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', padding: 0 }}>
      {skills.map((skill, index) => (
        <li key={index} style={{
          backgroundColor: '#f3f3f3',
          padding: '10px 15px',
          margin: '5px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {skill}
        </li>
      ))}
    </ul>
  </section>
);

export default SkillsSection;