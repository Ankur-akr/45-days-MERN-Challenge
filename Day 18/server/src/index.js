require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const promClient = require('prom-client');
const passport = require('passport');
const { jwtStrategy } = require('./lib/auth');
const logger = require('./lib/logger');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 4000;

// Prometheus metrics
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method','route','code'],
  buckets: [50,100,200,300,400,500,1000]
});

// Middlewares
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(morgan('combined', { stream: logger.stream }));
app.use(passport.initialize());
passport.use(jwtStrategy);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200
});
app.use(limiter);

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

// Healthcheck
app.get('/healthz', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Routes
app.use('/api', routes);

// basic timing middleware
app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.route ? req.route.path : req.path, code: res.statusCode });
  });
  next();
});

// Error handler
app.use((err, req, res, next) => {
  logger.error(err.stack || err.message);
  res.status(500).json({ error: 'internal_server_error' });
});

// Connect to DB and start
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'mern_ascent' });
    logger.info('Connected to MongoDB');
    app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
  } catch (err) {
    logger.error('Startup error', err);
    process.exit(1);
  }
};

start();
