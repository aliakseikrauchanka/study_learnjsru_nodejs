var http = require('http');

var server = http.createServer((req, res) => {
    setImmediate(function run() {
        heavyCalc(part++);
        if (notFinished) setImmediate(run);
    });
});

server.listen(4000);
