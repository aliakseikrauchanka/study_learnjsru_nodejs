var optimist = require('optimist');
var http = require('http');

var port = optimist.argv.port;

http.createServer((req, res) => {
    res.end('Hello');
}).listen(port);
