import React, { useEffect, useState } from "react";
import ExperienceCard from "./ExperienceCard";

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch("/src/data/experiences.json")
      .then((res) => res.json())
      .then((data) => setExperiences(data))
      .catch((err) => console.error("Error loading experiences:", err));
  }, []);

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Work Experience
      </h1>
      {experiences.length === 0 ? (
        <p className="text-center text-gray-500">Loading experiences...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ExperienceSection;