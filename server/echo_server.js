var http = require('http');
var url = require('url');

var server = new http.Server();
server.on('request', (req, res) => {
    let parsedUrl = url.parse(req.url, true);
    if (parsedUrl.pathname === '/echo' && parsedUrl.query.message) {
        res.end(parsedUrl.query.message);
    } else {
        res.statusCode = 404;
        res.end('Page not found');
    }
});

server.listen(999, 'localhost');
