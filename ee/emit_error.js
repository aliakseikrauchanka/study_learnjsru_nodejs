var EventEmitter = require('events').EventEmitter;

var server = new EventEmitter();

// sequence of event handlers matters
server.on('error', function (data) {
    console.log('Error data: ', data);
});

// server.emit('error'); // emits TypeError

server.emit('error', { code: 123 });
