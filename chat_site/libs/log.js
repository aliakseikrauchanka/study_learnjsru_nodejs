var winston = require('winston');
var ENV = process.env.NODE_ENV;

function logger(module) {
    var path = module.filename.split('\\').slice(-2).join('\\');
    console.log('PATH', path);

    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: ENV === 'development' ? 'debug' : 'error',
                label: path,
            }),
        ],
    });
}

module.exports = logger;
