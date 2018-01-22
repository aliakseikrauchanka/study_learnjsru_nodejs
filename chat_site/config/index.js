var nconf = require('nconf');
var path = require('path');

nconf
    .argv()
    .file({
        file: path.join(__dirname, 'config.json'),
    });

nconf.set('database:host', '127.0.0.1');
nconf.set('database:port', 111);

module.exports = nconf;

