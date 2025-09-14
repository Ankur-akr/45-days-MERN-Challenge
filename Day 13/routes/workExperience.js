const express = require('express');
const WorkExperience = require('../models/WorkExperience');
const validateWorkExperience = require('../middleware/validateWorkExperience');

const router = express.Router();

// CREATE
router.post('/', validateWorkExperience, async (req, res, next) => {
  try {
    const work = await WorkExperience.create(req.body);
    res.status(201).json({ success: true, data: work });
  } catch (err) {
    next(err);
  }
});

// READ (all + filtering)
router.get('/', async (req, res, next) => {
  try {
    const filter = req.query || {};
    const works = await WorkExperience.find(filter);
    res.json({ success: true, count: works.length, data: works });
  } catch (err) {
    next(err);
  }
});

// READ (single)
router.get('/:id', async (req, res, next) => {
  try {
    const work = await WorkExperience.findById(req.params.id);
    if (!work) return res.status(404).json({ success: false, message: 'Work experience not found' });
    res.json({ success: true, data: work });
  } catch (err) {
    next(err);
  }
});

// UPDATE
router.put('/:id', validateWorkExperience, async (req, res, next) => {
  try {
    const work = await WorkExperience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!work) return res.status(404).json({ success: false, message: 'Work experience not found' });
    res.json({ success: true, data: work });
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const work = await WorkExperience.findByIdAndDelete(req.params.id);
    if (!work) return res.status(404).json({ success: false, message: 'Work experience not found' });
    res.json({ success: true, message: 'Work experience deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
