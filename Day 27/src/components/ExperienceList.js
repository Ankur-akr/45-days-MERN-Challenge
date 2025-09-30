import React, { useEffect, useState } from "react";

function ExperienceList({ refresh }) {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/experience");
        const data = await res.json();
        setExperiences(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching experiences", err);
      }
    };
    fetchExperiences();
  }, [refresh]);

  return (
    <div>
      <h2>All Experiences</h2>
      {experiences.length === 0 ? (
        <p>No experiences found.</p>
      ) : (
        <ul>
          {experiences.map((exp) => (
            <li key={exp._id || exp.company}>
              <strong>{exp.position}</strong> at {exp.company} ({exp.startDate} - {exp.current ? "Present" : exp.endDate})
              <br />
              <em>{exp.description}</em>
              <br />
              Skills: {Array.isArray(exp.skills) ? exp.skills.join(", ") : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExperienceList;
