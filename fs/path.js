var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var mime = require('mime');

http.createServer(function (req, res) {
    if (!isAuthorized(req)) {
        res.statusCode = 401;
        res.end('Not authorized');
        return;
    }

    handleFileSend(req, res);
}).listen(8888);

function isAuthorized(req) {
    return url.parse(req.url, true).query.key === '0_0';
}

function handleFileSend(req, res) {
    let parsedUrl = url.parse(req.url, true);
    var ROOT = __dirname + '/public';

    // decode
    let pathname;
    try {
        pathname = decodeURIComponent(parsedUrl.pathname);
    } catch (e) {
        res.statusCode = 400;
        res.end('Wrong URL');
    }

    if (~pathname.indexOf('\0')) {
        res.statusCode = 400;
        res.end('Wrong URL');
    }

    var fullPath = path.normalize(path.join(ROOT, pathname));

    if (~fullPath.indexOf(ROOT)) {
        res.statusCode = 404;
        res.end('File is not found');
    }

    fs.stat(fullPath, function (err, stats) {
        if (err || !stats.isFile()) {
            res.statusCode = 404;
            res.end('File is not found');
        }
    });

    fs.readFile(fullPath, function (err, content) {
        if (err) {
            console.log(err);
        }

        var mime = require('mime').getType(fullPath);
        res.setHeader('Content-Type', mime + '; charset=utf-8');
        res.end(content);
    });
}
