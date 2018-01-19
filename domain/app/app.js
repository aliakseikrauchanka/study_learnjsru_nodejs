var domain = require('domain');

var outerDomain = domain.create();

let server;

outerDomain.on('error', err => {
    console.log(`Catched in outer domain ${err}`);

    if (server) {
        server.close();
    }

    setTimeout(() => { process.exit(1); }, 1000).unref();
});

outerDomain.run(()=> {
    const http = require('http');
    const handler = require('./handler.js');

    server = new http.Server();
    server.on('request', (req, res) => {
        var requestDomain = domain.create();
        requestDomain.add(req);
        requestDomain.add(res);
        // console.log();
        requestDomain.on('error', err => {
            res.statusCode = 500;
            res.end('Server error');
            console.log('Catched in inner domain', err);
            outerDomain.emit('error', err);
        });

        requestDomain.run(() => {
            handler(req, res);
        });

    });
    server.listen(777);
});
