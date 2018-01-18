var http = require('http');
var fs = require('fs');
var chat = require('./chat');

http.createServer((req, res) => {
    switch (req.url) {
        case '/publish':
            var body = '';

            req.on('readable', () => {
                var chunk = req.read();
                if (chunk) {
                    body += chunk;
                    if (body.length > 1e4) {
                        res.statusCode = 400;
                        res.end('Bad request');
                    }
                }
            });
            req.on('end', () => {
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    res.statusCode = 400;
                    res.end('Bad request');
                    return;
                }

                chat.publish(body.message);
            });

            break;
        case '/subscribe':
            chat.subscribe(req, res);
            break;
        case '/':
            sendFile('index.html', res);
            break;
        default:
            res.statusCode = 404;
            res.end('Page not found');
    }
}).listen(777);

function sendFile(fileName, to) {
    var file = fs.createReadStream(fileName);

    file
        .on('error', err => {
            to.statusCode = 500;
            console.log(err);
            to.end('Error while reading');
        });

    file.pipe(to);

    // need to wait for 'close' res event in order to destroy file accordingly
    to.on('close', () => {
        file.destroy();
    });
}
