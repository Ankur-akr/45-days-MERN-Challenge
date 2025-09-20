const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const transport = new transports.DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [transport, new transports.Console()]
});

logger.stream = {
  write: (message) => logger.info(message.trim())
};

module.exports = logger;
