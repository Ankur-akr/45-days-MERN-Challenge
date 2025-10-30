import React from "react";

const ProjectCard = ({ project, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{project.name}</h2>
      <p className="text-gray-600">{project.description}</p>
      <button
        onClick={onDelete}
        className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default ProjectCard;
