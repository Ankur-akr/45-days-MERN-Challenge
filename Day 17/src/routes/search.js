const express = require('express');
const store = require('../data/store');
const router = express.Router();

router.get('/', (req, res) => {
  const q = req.query.q || '';
  const results = store.search(q);
  res.json(results);
});

module.exports = router;
