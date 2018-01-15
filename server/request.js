var url = require('url');
var debug = require('debug')('server:request');

module.exports = (req, res) => {
    debug('Processing request:', req.method, req.url);

    var parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && parsedUrl.pathname === '/echo') {
        var message = parsedUrl.query.message;
        debug('Echo', message);
        res.end(message);
        return;
    }

    debug('Unknown URL');
    res.end('Not found');
};
