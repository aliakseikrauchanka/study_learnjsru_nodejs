var http = require('http');
var fs = require('fs');

http.createServer((req, res) => {
    // res: ServerResponse > stream.Writable

    if (req.url === '/file') {
        var file = new fs.ReadStream('big.html');

        sendFile(file, res);
    } else {
        res.end('ololo');
    }
}).listen(777);

function sendFile(file, to) {
    file.pipe(to);

    file
        .on('error', err => {
            to.statusCode = 500;
            console.log(err);
            to.end('Error while reading');
        })
        .on('open', () => {
            console.log('open');
        })
        .on('close', () => {
            console.log('close');
        });

    // need to wait for 'close' res event in order to destroy file accordingly
    to.on('close', () => {
        file.destroy();
    });
}

