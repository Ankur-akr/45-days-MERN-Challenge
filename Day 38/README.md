# Day 38: Deleting Projects from the UI

✅ Core Concept:
Passing functions with arguments as props.

🧠 Daily Challenge:
Add a "Delete" button to each <ProjectCard>. 
When clicked, it makes a DELETE request to your API and refreshes the project list.

🚀 Solution Approach:
- The `deleteProject(id)` function lives in the parent (App.jsx).
- Pass it down as `onDelete={() => deleteProject(project.id)}`.
- Child triggers parent function when the button is clicked.
