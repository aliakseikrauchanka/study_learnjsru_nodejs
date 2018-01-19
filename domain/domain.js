const domain = require('domain');
const fs = require('fs');
const http = require('http');

var ownDomain = domain.create();

ownDomain.on('error', err => {
    console.log(`Catched error: ${err}`);
});

var server;
ownDomain.run(() => {
    // domain.enter();
    server = http.createServer((req, res) => {});
    // domain.exit();
});

server.on('event', data => {
    setTimeout(() => {
        fs.readFile(__filename, () => {
            console.log(process.domain, server.domain);
            ERROR();
        });
    }, 1000);
});

server.emit('event');
