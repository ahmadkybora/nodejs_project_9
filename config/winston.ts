import winston from 'winston';
import appRoot from 'app-root-path';

const options = {
    File: {
        level: "info",
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        format: winston.format.json(),
        maxsize: 5000000,
        maxFile: 5,
    },
    console: {
        level: "debug",
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
        ),
    }
};

const logger = new winston.createLogger({
    transports: [
        new winston.transports.File(options.File),
        new winston.transports.Console(options.console),
    ]
});

logger.stream = {
    write: function(message) {
        logger.info(message);
    }
};

module.exports = logger;