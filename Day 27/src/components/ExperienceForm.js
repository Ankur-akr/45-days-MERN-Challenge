import React, { useState } from "react";

function ExperienceForm({ onSaved }) {
  const [form, setForm] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    skills: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
      endDate: name === "current" && checked ? "" : form.endDate,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.company || !form.position || !form.startDate) {
      setMessage("Company, Position, and Start Date are required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          skills: form.skills.split(",").map((s) => s.trim()),
        }),
      });

      if (res.ok) {
        setMessage("Experience saved ✅");
        setForm({
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
          skills: "",
        });
        onSaved();
      } else {
        setMessage("Failed to save ❌");
      }
    } catch (err) {
      setMessage("Error connecting to server ⚠️");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <input type="text" name="company" placeholder="Company" value={form.company} onChange={handleChange} />
      <input type="text" name="position" placeholder="Position" value={form.position} onChange={handleChange} />
      <label>
        Start Date:
        <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
      </label>
      {!form.current && (
        <label>
          End Date:
          <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
        </label>
      )}
      <label>
        <input type="checkbox" name="current" checked={form.current} onChange={handleChange} /> Current Role
      </label>
      <textarea name="description" placeholder="Job Description" value={form.description} onChange={handleChange} />
      <input type="text" name="skills" placeholder="Skills (comma separated)" value={form.skills} onChange={handleChange} />
      <button type="submit" style={{ padding: "10px", background: "blue", color: "white" }}>Save Experience</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default ExperienceForm;
