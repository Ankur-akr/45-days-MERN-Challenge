import express from 'express';
import Work from '../models/Work.js';
const router = express.Router();

function buildFilters(query) {
  const filters = {};
  if (query.userId) filters.userId = query.userId;
  if (query.company) filters.company = { $regex: query.company, $options: 'i' };
  if (query.role) filters.role = { $regex: query.role, $options: 'i' };
  if (query.tech) filters.technologies = { $in: [ new RegExp(query.tech, 'i') ] };
  if (query.current) filters.isCurrent = query.current === 'true';
  if (query.startBefore || query.startAfter) {
    filters.startDate = {};
    if (query.startBefore) filters.startDate.$lte = new Date(query.startBefore);
    if (query.startAfter) filters.startDate.$gte = new Date(query.startAfter);
  }
  if (query.endBefore || query.endAfter) {
    filters.endDate = filters.endDate || {};
    if (query.endBefore) filters.endDate.$lte = new Date(query.endBefore);
    if (query.endAfter) filters.endDate.$gte = new Date(query.endAfter);
  }
  return filters;
}

// List
router.get('/', async (req, res) => {
  try {
    const { page=1, limit=20, sort='-startDate' } = req.query;
    const filters = buildFilters(req.query);
    const skip = (Number(page)-1)*Number(limit);
    const [items, total] = await Promise.all([
      Work.find(filters).sort(sort).skip(skip).limit(Number(limit)),
      Work.countDocuments(filters)
    ]);
    res.json({ meta: { total, page: Number(page), limit: Number(limit) }, data: items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create
router.post('/', async (req, res) => {
  try {
    const item = await Work.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Bad request', error: err.message });
  }
});

// Get by id
router.get('/:id', async (req, res) => {
  try {
    const item = await Work.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Bad request' });
  }
});

// Patch (partial update)
router.patch('/:id', async (req, res) => {
  try {
    const item = await Work.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Bad request' });
  }
});

// Put (full replace)
router.put('/:id', async (req, res) => {
  try {
    const item = await Work.findOneAndReplace({ _id: req.params.id }, req.body, { new: true, upsert: false });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Bad request' });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Work.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Bad request' });
  }
});

export default router;