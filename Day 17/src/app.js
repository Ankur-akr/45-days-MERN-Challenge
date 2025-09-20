const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const searchRouter = require('./routes/search');
const healthRouter = require('./routes/health');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/search', searchRouter);
app.use('/health', healthRouter);

// basic error handler
app.use((err, req, res, next) => {
  console.error(err && err.stack ? err.stack : err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
