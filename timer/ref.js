var http = require('http');
var fs = require('fs');

var server = http.createServer((req, res) => {
    if (req.url === '/') {
        let file = fs.readFileSyncAsync('index.html', function cb(err, file) {
            // cb(err)
            // cb(null, ...)
            if (err) {
                console.log(err);
                res.statusCode = 500;
                res.end('Not read');
                return;
            }

            res.end(file);
        });
    } else {
        res.statusCode = 404;
        res.end('Page not found');
    }
});

server.listen(4000);

setTimeout(() => server.close(), 2500);

var interval = setInterval(()=> {
    console.log(process.memoryUsage());
}, 1000);

interval.unref();
