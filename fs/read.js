let fs = require('fs');

fs.readFile(__filename, /*{ encoding: 'utf-8' }, */function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data.toString());
    }
});
