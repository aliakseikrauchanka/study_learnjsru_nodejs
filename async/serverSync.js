var http = require('http');
var fs = require('fs');

http.createServer((req, res) => {
    if (req.url === '/') {
        try {
            let file = fs.readFileSync('index.html');
            res.end(file);
        } catch (e) {
            res.statusCode = 500;
            res.end('Not read');
        }
    } else {
        res.statusCode = 404;
        res.end('Page not found');
    }
}).listen(4000);
