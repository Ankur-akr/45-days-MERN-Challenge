let projects = [];

exports.getProjects = (req, res) => res.json(projects);

exports.createProject = (req, res) => {
  const project = { id: Date.now(), ...req.body };
  projects.push(project);
  res.status(201).json(project);
};

exports.updateProject = (req, res) => {
  const { id } = req.params;
  projects = projects.map(p => (p.id == id ? { ...p, ...req.body } : p));
  res.json({ message: "Project updated successfully" });
};

exports.deleteProject = (req, res) => {
  const { id } = req.params;
  projects = projects.filter(p => p.id != id);
  res.json({ message: "Project deleted successfully" });
};