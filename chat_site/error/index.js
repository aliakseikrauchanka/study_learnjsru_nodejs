let http = require('http');

class HttpError extends Error {
    constructor(statusCode, message) {
        message = message || http.STATUS_CODES[statusCode] || 'Error';
        super(message);
        this.statusCode = statusCode;
    }
}
HttpError.prototype.name = 'HttpError';

exports.HttpError = HttpError;
