const express = require('express');
const Task = require('../models/Task');
const Team = require('../models/Team');

const router = express.Router();

// quick dashboard stats
router.get('/dashboard', async (req, res, next) => {
  try {
    const totalTasks = await Task.countDocuments();
    const completed = await Task.countDocuments({ status: 'done' });
    const teams = await Team.countDocuments();
    res.json({ success:true, data: { totalTasks, completed, teams } });
  } catch (err) { next(err); }
});

module.exports = router;
