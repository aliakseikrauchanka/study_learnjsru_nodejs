var http = require('http');
var fs = require('fs');

http.createServer((req, res) => {
    // res: ServerResponse > stream.Writable

    if (req.url === '/file') {
        var file = new fs.ReadStream(__filename, { encoding: 'utf-8' });

        send(file, res);
    } else {
        res.end('ololo');
    }
}).listen(777);

function send(file, res) {
    file.on('readable', write);
    file.on('end', () => {res.end();});

    function write() {
        var data = file.read(); // READ
        if (data && !res.write(data)) { // TRY WRITE
            file.removeListener('readable', write);

            res.once('drain', () => { // WAIT until write stream is drain
                file.on('readable', write);
                write();
            });
        }
    }
}
