let experiences = [];

exports.getExperiences = (req, res) => res.json(experiences);

exports.createExperience = (req, res) => {
  const exp = { id: Date.now(), ...req.body };
  experiences.push(exp);
  res.status(201).json(exp);
};

exports.updateExperience = (req, res) => {
  const { id } = req.params;
  experiences = experiences.map(e => (e.id == id ? { ...e, ...req.body } : e));
  res.json({ message: "Experience updated successfully" });
};

exports.deleteExperience = (req, res) => {
  const { id } = req.params;
  experiences = experiences.filter(e => e.id != id);
  res.json({ message: "Experience deleted successfully" });
};