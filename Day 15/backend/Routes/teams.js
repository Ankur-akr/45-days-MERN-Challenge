const express = require('express');
const Team = require('../models/Team');
const User = require('../models/User');
const { auth, permit } = require('../middleware/auth');

const router = express.Router();

// Create team
router.post('/', auth, async (req, res, next) => {
  try {
    const { name, description, members = [] } = req.body;
    const team = await Team.create({ name, description, members, createdBy: req.user._id });
    res.status(201).json({ success: true, data: team });
  } catch (err) { next(err); }
});

// Get teams (optionally filter by member)
router.get('/', auth, async (req, res, next) => {
  try {
    const { member } = req.query;
    const filter = {};
    if (member) filter.members = member;
    const teams = await Team.find(filter).populate('members', 'name email');
    res.json({ success: true, count: teams.length, data: teams });
  } catch (err) { next(err); }
});

// Add member to team (only team creator or admin)
router.post('/:id/members', auth, async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });
    // only admin or creator can add
    if (team.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ success: false, message: 'userId required' });
    if (team.members.includes(userId)) return res.status(400).json({ success: false, message: 'Already a member' });
    team.members.push(userId);
    await team.save();
    const populated = await Team.findById(team._id).populate('members','name email');
    res.json({ success: true, data: populated });
  } catch (err) { next(err); }
});

// Remove member
router.delete('/:id/members/:userId', auth, async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });
    if (team.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    team.members = team.members.filter(m => m.toString() !== req.params.userId);
    await team.save();
    res.json({ success: true, data: team });
  } catch (err) { next(err); }
});

module.exports = router;
