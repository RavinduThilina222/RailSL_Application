const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// Define the custom format for log messages
const myFormat = printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    if (metadata) {
        msg += ` ${JSON.stringify(metadata)}`;
    }
    return msg;
});

// Create the logger
const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'app.log' })
    ],
});

// Middleware to log user activities
const logUserActivity = (req, res, next) => {
    const user = req.user || 'anonymous'; // Assuming req.user contains user info
    const logMessage = {
        method: req.method,
        url: req.url,
        user: user,
        ip: req.ip,
        userAgent: req.headers['user-agent']
    };
    logger.info('User activity', logMessage);
    next();
};

// Function to log specific user actions
const logAction = (action, user) => {
    const logMessage = {
        action: action,
        user: user,
        timestamp: new Date().toISOString()
    };
    logger.info('User action', logMessage);
};

module.exports = { logger, logUserActivity, logAction };