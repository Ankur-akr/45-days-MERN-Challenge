const express = require('express');
const store = require('../data/store');
const router = express.Router();

router.post('/', (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'name and email required' });
  const u = store.createUser({ name, email });
  res.status(201).json(u);
});

router.get('/', (req, res) => {
  res.json(store.getUsers());
});

router.get('/:id', (req, res) => {
  const u = store.getUser(req.params.id);
  if (!u) return res.status(404).json({ error: 'not found' });
  res.json(u);
});

router.put('/:id', (req, res) => {
  const u = store.updateUser(req.params.id, req.body);
  if (!u) return res.status(404).json({ error: 'not found' });
  res.json(u);
});

router.delete('/:id', (req, res) => {
  const ok = store.deleteUser(req.params.id);
  if (!ok) return res.status(404).json({ error: 'not found' });
  res.status(204).send();
});

module.exports = router;
