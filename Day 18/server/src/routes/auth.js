const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

router.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { email, password, name } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(409).json({ error: 'email_exists' });
    user = new User({ email, password, name });
    await user.save();
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET || 'replace_with_secret', { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'registration_failed' });
  }
});

router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'invalid_credentials' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ error: 'invalid_credentials' });
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET || 'replace_with_secret', { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'login_failed' });
  }
});

module.exports = router;
