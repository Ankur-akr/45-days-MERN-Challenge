const skills = [
  { name: "HTML", proficiency: "Advanced" },
  { name: "CSS", proficiency: "Advanced" },
  { name: "JavaScript", proficiency: "Beginner" }
];

function formatSkills(skillsArray) {
  return skillsArray.map(skill => `${skill.name} (${skill.proficiency})`);
}

const formattedSkills = formatSkills(skills);

const skillsList = document.getElementById("skills-list");
formattedSkills.forEach(skill => {
  const li = document.createElement("li");
  li.textContent = skill;
  skillsList.appendChild(li);
});