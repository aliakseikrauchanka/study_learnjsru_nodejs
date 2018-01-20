var async = require('async');
var fs = require('fs');

// async.map([__filename, 'readwrite.js'], fs.stat, (error, results) => {
//     console.log(results);
// });

async.parallel([
        function (callback) {
            setTimeout(function () {
                callback(null, 'one');
            }, 200);
        },

        function (callback) {
            setTimeout(function () {
                callback({ errorNumber: 1 }, 'two');
            }, 100);
        },
    ],
// optional callback
    function (err, results) {
        console.log(results);
        // the results array will equal ['one','two'] even though
        // the second function had a shorter timeout.
    });
