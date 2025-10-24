import React from "react";

const ExperienceCard = ({ experience }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 hover:shadow-xl transition-all duration-300">
      <h2 className="text-xl font-semibold text-gray-800">{experience.role}</h2>
      <h3 className="text-md text-gray-600">{experience.company}</h3>
      <p className="text-sm text-gray-500 mb-2">{experience.duration}</p>
      <p className="text-gray-700">{experience.description}</p>
    </div>
  );
};

export default ExperienceCard;