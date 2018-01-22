const net = require('net');
const server = net.createServer();

server.listen(999);
server.on('listening', () => {
    console.log('Listening started ...');
});

server.on('connection', socket => {
    socket.write('Hello fucking client');
    console.log('Client connected');

    socket.on('data', data => {
        console.log(data.toString());
    });

    socket.on('error', err => {
        console.log(err);
    });

    socket.on('end', () => {
        console.log('FIN received');
    });

    socket.on('close', () => {
        console.log('Connection with client ended');
    });

    socket.pipe(socket);
});

