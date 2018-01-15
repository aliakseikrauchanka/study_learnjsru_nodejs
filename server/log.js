var winston = require('winston');

module.exports = function (module) {
    return createLogger(module.filename);
};

function createLogger(filename) {
    // can be simplified and read config file
    if (/request\.js/.test(filename)) {
        var transports = [
            new winston.transports.Console({
                timestamp: true,
                colorsize: true,
                level: 'info',
            }),
            new winston.transports.File({
                filename: 'debug.log',
                level: 'debug',
            }),
        ];
        return new winston.Logger({
            transports: transports,
        });
    } else {
        return new winston.Logger({
            transports: [],
        });
    }
}
