'use strict';

var EventEmitter = require('events').EventEmitter;

var server = new EventEmitter();

// sequence of event handlers matters
server.on('event', function (data) {
    data.newProp = 'value';
});

server.on('event', function (data) {
    console.log('second handler', data);
});

server.emit('event', { from: 'Boris' });
server.emit('event', { from: 'Ben' });
console.log(server.listeners('event').forEach(f => {
    console.log(f.toString());
}));
