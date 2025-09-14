const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { auth } = require('../middleware/auth');

const router = express.Router();

// ➕ Create comment (authenticated)
router.post('/', auth, async (req, res, next) => {
  try {
    const { post: postId, content, parentId } = req.body;
    if (!postId || !content) {
      return res.status(400).json({ success: false, message: 'post and content required' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const comment = await Comment.create({
      post: postId,
      author: req.user._id,
      content,
      parentId: parentId || null
    });

    res.status(201).json({ success: true, data: comment });
  } catch (err) {
    next(err);
  }
});

// 📖 Get comments for a post
router.get('/post/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: 1 })
      .populate('author', 'name');
    res.json({ success: true, count: comments.length, data: comments });
  } catch (err) {
    next(err);
  }
});

// ❌ Delete comment (author or admin)
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    if (comment.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    await Comment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Comment deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
