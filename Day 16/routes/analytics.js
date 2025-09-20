const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Experience = require('../models/Experience');

router.get('/skills', async (req, res, next) => {
  try {
    const skills = await Project.aggregate([
      { $unwind: '$technologies' },
      { $group: { _id: '$technologies', count: { $sum: 1 } } }
    ]);
    res.json({ success:true, data: skills });
  } catch (err) { next(err); }
});

router.get('/career', async (req, res, next) => {
  try {
    const career = await Experience.aggregate([
      { $group: { _id: '$company', count: { $sum: 1 } } }
    ]);
    res.json({ success:true, data: career });
  } catch (err) { next(err); }
});

router.get('/technology', async (req, res, next) => {
  try {
    const trend = await Project.aggregate([
      { $unwind: '$technologies' },
      { $group: { _id: '$technologies', count: { $sum: 1 } } }
    ]);
    res.json({ success:true, data: trend });
  } catch (err) { next(err); }
});

module.exports = router;