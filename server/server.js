var User = require('./user');
// NODE_PATH=.
var db = require('db');
var log = require('logger')(module);
db.connect();

log(db.getPhrase('Run successfully'));

function run() {
    var vasja = new User('Vasja');
    var petja = new User('Petja');

    petja.hello(vasja);
}

if (module.parent) {
    exports.run = run;
} else {
    run();
}