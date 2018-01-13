var phrases;

exports.connect = function () {
    phrases = require('./ru.json');
};

exports.getPhrase = function (name) {
    if (!phrases[name]) {
        throw new Error('No such phrase in locales: ', name);
    }

    return phrases[name];
};