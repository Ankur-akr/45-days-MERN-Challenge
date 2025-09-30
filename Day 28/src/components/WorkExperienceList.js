import React, { useEffect, useState } from "react";
import WorkExperienceCard from "./WorkExperienceCard";

const WorkExperienceList = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/work-experiences");
        if (!res.ok) throw new Error("Failed to fetch experiences");
        const data = await res.json();
        setExperiences(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) return <p className="status">⏳ Loading experiences...</p>;
  if (error) return <p className="status error">❌ {error}</p>;
  if (experiences.length === 0) return <p className="status">⚠️ No experiences found.</p>;

  return (
    <div className="experience-grid">
      {experiences.map((exp) => (
        <WorkExperienceCard key={exp.id || exp._id} experience={exp} />
      ))}
    </div>
  );
};

export default WorkExperienceList;
