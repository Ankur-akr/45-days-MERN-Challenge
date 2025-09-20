const express = require('express');
const store = require('../data/store');
const router = express.Router();

router.post('/', (req, res) => {
  const { title, body, authorId } = req.body;
  if (!title || !body || !authorId) return res.status(400).json({ error: 'title, body and authorId required' });
  if (!store.getUser(authorId)) return res.status(400).json({ error: 'author not found' });
  const p = store.createPost({ title, body, authorId });
  res.status(201).json(p);
});

router.get('/', (req, res) => res.json(store.getPosts()));

router.get('/:id', (req, res) => {
  const p = store.getPost(req.params.id);
  if (!p) return res.status(404).json({ error: 'not found' });
  res.json(p);
});

router.put('/:id', (req, res) => {
  const p = store.updatePost(req.params.id, req.body);
  if (!p) return res.status(404).json({ error: 'not found' });
  res.json(p);
});

router.delete('/:id', (req, res) => {
  const ok = store.deletePost(req.params.id);
  if (!ok) return res.status(404).json({ error: 'not found' });
  res.status(204).send();
});

module.exports = router;
