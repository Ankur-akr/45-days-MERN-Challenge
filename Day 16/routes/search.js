const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const User = require('../models/User');
const Experience = require('../models/Experience');
const Technology = require('../models/Technology');

router.get('/', async (req, res, next) => {
  try {
    const q = (req.query.q || '').trim();
    const regex = new RegExp(q, 'i');
    const results = {};
    results.projects = await Project.find({ $or: [{ title: regex }, { description: regex }] }).limit(5);
    results.users = await User.find({ $or: [{ name: regex }, { bio: regex }] }).limit(5);
    results.experience = await Experience.find({ $or: [{ company: regex }, { position: regex }] }).limit(5);
    results.technologies = await Technology.find({ name: regex }).limit(5);
    res.json({ success:true, data: results });
  } catch (err) { next(err); }
});

module.exports = router;