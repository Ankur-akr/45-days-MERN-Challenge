import React from "react";

const WorkExperienceCard = ({ company, role, duration, location, technologies }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition-all">
      <h2 className="text-xl font-bold text-gray-800">{role}</h2>
      <h3 className="text-gray-600 mb-2">{company}</h3>
      <p className="text-sm text-gray-500">{duration}</p>
      <p className="text-sm text-gray-500">{location}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {technologies?.map((tech, idx) => (
          <span
            key={idx}
            className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WorkExperienceCard;
