const express = require('express');
const router = express.Router();
const auth = require('./auth');
const user = require('./user');

router.use('/auth', auth);
router.use('/users', user);

router.get('/', (req, res) => res.json({ message: 'MERN Ascent API' }));

module.exports = router;
