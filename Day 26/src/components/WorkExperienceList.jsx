import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkExperienceCard from "./WorkExperienceCard";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const API_URL = "http://localhost:4000/api/work-experiences";

const WorkExperienceList = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchExperiences = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(API_URL);
      setExperiences(res.data);
    } catch (err) {
      setError("⚠️ Failed to load experiences. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={fetchExperiences} />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {experiences.map((exp) => (
        <WorkExperienceCard
          key={exp._id}
          company={exp.company}
          role={exp.role}
          duration={`${exp.startDate} - ${exp.endDate || "Present"}`}
          location={exp.location}
          technologies={exp.technologies}
        />
      ))}
    </div>
  );
};

export default WorkExperienceList;
