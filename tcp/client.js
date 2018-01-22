const net = require('net');
const socket = net.connect({ port: 999 });

process.stdin.pipe(socket);

socket.on('connect', () => {
    console.log('Connected to the server!');
});

socket.on('close', hadError => {
    process.exit();
});

process.stdin.on('data', data => {
    if (data.toString().trim() === 'exit') {
        socket.end('Goodbye server!'); // send to server FIN event
    }
});

process.on('SIGINT', () => {
    if (socket) {
        socket.end('Forced termination');
        process.exit();
    }
});
