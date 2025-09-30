import React, { useState } from "react";
import ExperienceForm from "./components/ExperienceForm";
import ExperienceList from "./components/ExperienceList";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Work Experience Manager</h1>
      <ExperienceForm onSaved={() => setRefresh(!refresh)} />
      <hr />
      <ExperienceList refresh={refresh} />
    </div>
  );
}

export default App;
