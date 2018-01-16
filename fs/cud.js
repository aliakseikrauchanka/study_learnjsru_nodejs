let fs = require('fs');

fs.writeFile('new_file', 'some data', function (err) {
    if (err) {
        throw err;
    }

    fs.rename('new_file', 'new_new_file', function (err) {
        if (err) {
            throw err;
        }

        fs.unlink('new_new_file', function (err) {
            if (err) {
                throw err;
            }
        });
    });
});
