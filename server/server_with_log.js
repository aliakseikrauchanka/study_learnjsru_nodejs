var http = require('http');
var debug = require('debug')('server');

console.log(process.env.DEBUG);

var server = new http.Server();
server.on('request', require('./request'));
server.listen(888, 'localhost');
debug('Server is running');
