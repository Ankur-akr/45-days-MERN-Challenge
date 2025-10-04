let skills = [];

exports.getSkills = (req, res) => res.json(skills);

exports.createSkill = (req, res) => {
  const skill = { id: Date.now(), ...req.body };
  skills.push(skill);
  res.status(201).json(skill);
};

exports.updateSkill = (req, res) => {
  const { id } = req.params;
  skills = skills.map(s => (s.id == id ? { ...s, ...req.body } : s));
  res.json({ message: "Skill updated successfully" });
};

exports.deleteSkill = (req, res) => {
  const { id } = req.params;
  skills = skills.filter(s => s.id != id);
  res.json({ message: "Skill deleted successfully" });
};