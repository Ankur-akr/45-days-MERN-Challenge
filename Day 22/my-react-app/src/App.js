import React, { useState } from 'react';
import ProjectCard from './ProjectCard'; // Make sure the path is correct

function App() {
  // 1. Create an array of project data in state using useState
  const [projects] = useState([
    {
      id: 1,
      title: 'Online Classroom Device (OCD)',
      description: 'Built a budget-friendly device that streams online classes to TVs for students without access to smart devices.',
      technologies: ['IoT', 'Hardware', 'Education'],
    },
    {
      id: 2,
      title: 'Smart Waste Management System',
      description: 'Designed an IoT-based system for efficient waste handling using Arduino and sensors.',
      technologies: ['Arduino', 'IoT', 'C Programming'],
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'A responsive and professional portfolio site showcasing personal skills, projects, and achievements.',
      technologies: ['JavaScript', 'HTML', 'CSS', 'React'],
    },
  ]);

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ textAlign: 'center' }}>My Projects</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* 2. Use the .map() method to render a list of ProjectCard components */}
        {/* 3. Add unique key props to each component for optimal React performance */}
        {/* 4. Pass correct props (title, description, etc.) to each ProjectCard */}
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} // The unique key prop is crucial for performance
            title={project.title}
            description={project.description}
            technologies={project.technologies}
          />
        ))}
      </div>
    </div>
  );
}

export default App;