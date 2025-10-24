import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6">
      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
      <p className="text-gray-600 mb-4">{project.description}</p>
      {project.link && (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block text-blue-600 font-medium hover:underline">
          View Project →
        </a>
      )}
    </div>
  );
};

export default ProjectCard;