import React, { useState, useEffect } from "react";

function AddEditProjectForm({ initial = { title: "", description: "" }, onSubmit, submitLabel = "Save", onCancel }) {
  const [title, setTitle] = useState(initial.title || "");
  const [description, setDescription] = useState(initial.description || "");

  useEffect(()=>{
    setTitle(initial.title || "");
    setDescription(initial.description || "");
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!title) return;
    onSubmit({ title, description });
    // if it's add form, clear fields. If edit form, parent will unmount it.
    if(!onCancel){
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{display:"flex", gap:10, alignItems:"center", flexWrap:"wrap"}}>
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        style={{flex:"1 1 200px"}}
      />
      <input
        type="text"
        placeholder="Project Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        style={{flex:"2 1 300px"}}
      />
      <div style={{display:"flex", gap:8}}>
        <button type="submit">{submitLabel}</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

export default AddEditProjectForm;
