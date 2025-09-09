// server.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/task_api_exercise', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  completed: { type: Boolean, default: false },
  dueDate: Date,
  completedAt: Date
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

// Create
app.post('/api/tasks', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all with filters
app.get('/api/tasks', async (req, res) => {
  try {
    const { completed, priority, dueDate, sort, order } = req.query;
    const query = {};

    if (completed !== undefined) query.completed = completed === 'true';
    if (priority) query.priority = priority;
    if (dueDate) query.dueDate = new Date(dueDate);

    let tasks = Task.find(query);

    if (sort) {
      tasks = tasks.sort({ [sort]: order === 'asc' ? 1 : -1 });
    }

    res.json(await tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ error: 'Not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Mark complete
app.put('/api/tasks/:id/complete', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: true, completedAt: new Date() },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Stats
app.get('/api/tasks/stats', async (req, res) => {
  const total = await Task.countDocuments();
  const completed = await Task.countDocuments({ completed: true });
  const pending = total - completed;
  res.json({
    total,
    completed,
    pending,
    completionPercent: total ? Math.round((completed / total) * 100) : 0
  });
});

// Server
app.listen(4001, () => console.log('🚀 Server running on http://localhost:4001'));
