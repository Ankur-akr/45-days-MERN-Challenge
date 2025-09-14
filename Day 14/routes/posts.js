const express = require('express');
const Post = require('../models/Post');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res, next) => {
  try {
    const payload = { ...req.body, author: req.user._id };
    const post = await Post.create(payload);
    res.status(201).json({ success: true, data: post });
  } catch (err) { next(err); }
});

router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, tag, category, published } = req.query;
    const filter = {};
    if (tag) filter.tags = tag;
    if (category) filter.categories = category;
    if (typeof published !== 'undefined') filter.published = published === 'true';

    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip((page-1) * limit)
      .limit(parseInt(limit))
      .populate('author', 'name email');

    const count = await Post.countDocuments(filter);
    res.json({ success: true, count, data: posts });
  } catch (err) { next(err); }
});

router.get('/:idOrSlug', async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    let post;
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      post = await Post.findById(idOrSlug).populate('author', 'name email');
    } else {
      post = await Post.findOne({ slug: idOrSlug }).populate('author', 'name email');
    }
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    Post.findByIdAndUpdate(post._id, { $inc: { views: 1 } }).catch(console.error);

    res.json({ success: true, data: post });
  } catch (err) { next(err); }
});

router.put('/:id', auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, data: updated });
  } catch (err) { next(err); }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Post deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
