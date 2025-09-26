import React from "react";
import WorkExperienceList from "./components/WorkExperienceList";
import "./styles.css";

function App() {
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Work Experience
      </h1>
      <WorkExperienceList />
    </div>
  );
}

export default App;

