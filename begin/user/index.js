// function(exports,
// NODE_PATH=.

var db = require('db');
var log = require('logger')(module);

function User(name) {
    this.name = name;
}

User.prototype.hello = function (man) {
    log(db.getPhrase('Hello'), man.name);
};

module.exports = User;