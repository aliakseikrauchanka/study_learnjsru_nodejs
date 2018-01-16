let fs = require('fs');

fs.readFile('blablabla', function (err, data) {
    if (err) {
        if (err.code === 'ENOENT') {
            console.log(err.message);
        } else {
            console.log(err);
        }
    } else {
        console.log(data.toString());
    }
});
