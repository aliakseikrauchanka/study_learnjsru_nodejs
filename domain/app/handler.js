const fs = require('fs');

module.exports = (req, res) => {
    fs.readFile('not-existed-file', (err, file) => {
        if (err) {
            throw err;
        }

        res.end(file);
    });
};
