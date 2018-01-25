https://gist.github.com/justmoon/15511f92e5216fa2624b
'use strict';

var util = require('util');

var phrases = {
    Hello: 'Hello',
    man: 'man',
};

function PhraseError(errorCode, message) {
    Error.captureStackTrace(this, PhraseError);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
}

util.inherits(PhraseError, Error);

class HttpError extends Error {
    constructor(errorCode, message) {
        super(message);
        this.name = this.constructor.name;
        this.errorCode = errorCode;

        // Error.captureStackTrace(this, HttpError);
    }
}

function getPhrase(name) {
    if (!phrases[name]) {
        throw new PhraseError(500, 'No phrase "' + name + '"');
    }

    return phrases[name];
}

function getPage(name) {
    if (name !== 'index.htm') {
        throw new HttpError(404, 'Page not found');
    }

    return util.format('%s %s', getPhrase('Hello'), getPhrase('man'));
}

try {
    getPage('index.html');
} catch (e) {
    console.log('Error: %d %s\nmessage: %s\nstack: %s', e.errorCode, e.name, e.message, e.stack);
    console.log('isError:', util.isError(e));
}
