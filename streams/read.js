let fs = require('fs');

var stream = fs.ReadStream(__filename, { encoding: 'utf-8' });
stream.on('readable', function () {
    var data = stream.read();
    console.log(data);
});

stream.on('end', () => {
    console.log("We've reached the end");
});

stream.on('error', err => {
    if (err.code === 'ENOENT') {
        console.log('This file does not exist');
    } else {
        consoel.log('Another than non-existing issue');
    }
});
