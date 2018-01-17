var http = require('http');
var fs = require('fs');

http.createServer((req, res) => {
    // res: ServerResponse > stream.Writable

    if (req.url === '/file') {
        var file = new fs.ReadStream(__filename);

        file.pipe(res);
        file.pipe(process.stdout);
    } else {
        res.end('ololo');
    }
}).listen(777);

