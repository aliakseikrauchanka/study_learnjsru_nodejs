var url = require('url');
var log = require('./log')(module);

// console.log(process.env.NODE_DEBUG);

module.exports = (req, res) => {
    log.info('Processing request:', req.method, req.url);

    var parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && parsedUrl.pathname === '/echo') {
        var message = parsedUrl.query.message;
        log.debug('Echo', message);
        res.end(message);
        return;
    }

    log.error('Unknown URL');
    res.statusCode = 404;
    res.end('Not found');
};
