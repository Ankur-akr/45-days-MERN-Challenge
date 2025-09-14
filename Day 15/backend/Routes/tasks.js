const express = require('express');
const Task = require('../models/Task');
const Team = require('../models/Team');
const { auth } = require('../middleware/auth');

const router = express.Router();

// CREATE task
router.post('/', auth, async (req, res, next) => {
  try {
    const payload = { ...req.body, createdBy: req.user._id };
    // if team provided, ensure team exists and user is a member
    if (payload.team) {
      const team = await Team.findById(payload.team);
      if (!team) return res.status(400).json({ success:false, message: 'Invalid team' });
      // optional: ensure req.user is a member
      if (!team.members.map(m => m.toString()).includes(req.user._id.toString()) && req.user.role !== 'admin') {
        return res.status(403).json({ success:false, message: 'Not a team member' });
      }
    }
    const task = await Task.create(payload);
    // emit via socket to clients (room per team)
    const io = req.app.locals.io;
    if (io && task.team) io.to(`team_${task.team}`).emit('task:created', task);
    res.status(201).json({ success: true, data: task });
  } catch (err) { next(err); }
});

// READ tasks (filtering & pagination)
router.get('/', auth, async (req, res, next) => {
  try {
    const { team, status, assignee, page=1, limit=20 } = req.query;
    const filter = {};
    if (team) filter.team = team;
    if (status) filter.status = status;
    if (assignee) filter.assignees = assignee;

    const tasks = await Task.find(filter)
      .sort({ createdAt: -1 })
      .skip((page-1)*limit)
      .limit(parseInt(limit))
      .populate('assignees', 'name email')
      .populate('createdBy','name email');

    const count = await Task.countDocuments(filter);
    res.json({ success: true, count, data: tasks });
  } catch (err) { next(err); }
});

// GET single
router.get('/:id', auth, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignees','name email');
    if (!task) return res.status(404).json({ success:false, message: 'Task not found' });
    res.json({ success:true, data: task });
  } catch (err) { next(err); }
});

// UPDATE (including status moves)
router.put('/:id', auth, async (req, res, next) => {
  try {
    const updates = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success:false, message: 'Task not found' });

    // optionally, check permission: must be team member or creator or admin
    if (task.team) {
      const team = await Team.findById(task.team);
      if (team && !team.members.map(m=>m.toString()).includes(req.user._id.toString()) && req.user.role !== 'admin') {
        return res.status(403).json({ success:false, message: 'Forbidden' });
      }
    }

    const updated = await Task.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    const io = req.app.locals.io;
    if (io && updated.team) io.to(`team_${updated.team}`).emit('task:updated', updated);
    res.json({ success:true, data: updated });
  } catch (err) { next(err); }
});

// DELETE
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success:false, message: 'Task not found' });
    // permission check
    if (task.team) {
      const team = await Team.findById(task.team);
      if (team && !team.members.map(m=>m.toString()).includes(req.user._id.toString()) && req.user.role !== 'admin') {
        return res.status(403).json({ success:false, message: 'Forbidden' });
      }
    }
    await Task.findByIdAndDelete(req.params.id);
    const io = req.app.locals.io;
    if (io && task.team) io.to(`team_${task.team}`).emit('task:deleted', { id: task._id });
    res.json({ success:true, message: 'Task deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
