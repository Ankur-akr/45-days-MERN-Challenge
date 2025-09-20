const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user);
});

module.exports = router;
