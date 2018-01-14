var http = require('http');

var counter = 0;

// option 1
var server = new http.Server(); // http.Server -> net.Server -> Event Emitter

var emit = server.emit;

// Keep-Alive
server.emit = function (event/*, ...args*/) {
    console.log(event);
    emit.apply(server, arguments);
};

var counter = 0;
server.on('request', (req, res) => {
    res.end(`Hello from first simple server: ${++counter}`);
});

// option 2
// var server = new http.createServer((req, res) => {
//     res.end(`Hello from first simple server: ${++counter}`);
// }); // Event Emitter

server.listen('999', 'localhost');
