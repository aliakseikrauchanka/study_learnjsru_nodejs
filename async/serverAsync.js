var http = require('http');
var fs = require('fs');

http.createServer((req, res) => {
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
}).listen(4000);
