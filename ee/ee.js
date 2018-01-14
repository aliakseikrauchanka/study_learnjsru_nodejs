'use strict';

var EventEmitter = require('events').EventEmitter;

var server = new EventEmitter();

// sequence matters
server.on('event', function (data) {
    data.newProp = 'value';
  });

server.on('event', function (data) {
    console.log('second handler', data);
  });

server.emit('event', { name: 'Boris' });
server.emit('event', { name: 'Ben' });
