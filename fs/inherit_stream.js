// Writable stream

/*const { Writable } = require('stream');
const outStream = new Writable({
    write(chunk, encoding, callback) {
        console.log(chunk[0], chunk[1], chunk[2]);
        callback();
    },
});

process.stdin.pipe(outStream);*/

// Readable stream

const { Readable } = require('stream');
/*const inStream = new Readable();
inStream.push('some');
inStream.push('data');
inStream.push(null); // No more data
inStream.pipe(process.stdout);*/

/*
* const inStream = new Readable({
  read(size) {
    // this.push('smth');
  }
});
*/

/*const inStream2 = new Readable({
    read(size) {
        this.push(String.fromCharCode(this.currentCharCode++));
        if (this.currentCharCode > 90) {
            this.push(null);
        }
    },
});
inStream2.currentCharCode = 65;
inStream2.pipe(process.stdout);*/


// Duplex stream
/*
const { Duplex } = require('stream');

const inoutStream = new Duplex({
    write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
    },

    read(size) {
        this.push(String.fromCharCode(this.currentCharCode++));
        if (this.currentCharCode > 90) {
            this.push(null);
        }
    },
});

inoutStream.currentCharCode = 65;
process.stdin.pipe(inoutStream).pipe(process.stdout);
*/


// TRANSFORM

const { Transform } = require('stream');

const upperCaseTr = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    },
});

process.stdin.pipe(upperCaseTr).pipe(process.stdout);
