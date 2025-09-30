import React from "react";

const WorkExperienceCard = React.memo(({ experience }) => {
  return (
    <div className="experience-card">
      <h3>{experience.role}</h3>
      <p><strong>Company:</strong> {experience.company}</p>
      <p><strong>Duration:</strong> {experience.startDate} - {experience.endDate || "Present"}</p>
      <p><strong>Skills:</strong> {experience.skills?.join(", ")}</p>
    </div>
  );
});

export default WorkExperienceCard;
