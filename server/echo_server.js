var http = require('http');
var url = require('url');

var server = new http.Server();
server.on('request', (req, res) => {

    let parsedUrl = url.parse(req.url, true);
    if (parsedUrl.pathname === '/echo' && parsedUrl.query.message) {
        // res.writeHead(200, 'OK', { 'Cache-control': 'no-cache' });

        res.setHeader('Cache-control', 'no-cache');
        res.end(parsedUrl.query.message);
    } else {
        res.statusCode = 404;
        res.end('Page not found');
    }
});

server.listen(999, 'localhost');
