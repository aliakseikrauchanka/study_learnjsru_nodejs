var EventEmitter = require('events').EventEmitter;

var db = new EventEmitter();

class BigObject {
    constructor() {
        this._bigData = new Array(1e6).join('*');

        db.on('event', this.onEvent);
    }

    send(data) {
        console.log(data);
    }

    end() {
        db.removeListener('event', this.onEvent);
    }

    onEvent(data) {
        this.send(data);
    }
}

setInterval(function () {
    var o = new BigObject();

    //...
    o.end();

    // console.log(db); // db._event
    console.log(process.memoryUsage().heapUsed);
}, 200);
