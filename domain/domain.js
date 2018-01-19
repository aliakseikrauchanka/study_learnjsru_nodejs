const domain = require('domain');
const fs = require('fs');

var ownDomain = domain.create();

ownDomain.on('error', err => {
    console.log(`Catched error: ${err}`);
});

ownDomain.run(() => {
    // domain.enter();
    setTimeout(() => {
        fs.readFile(__filename, (err, data) => {
            ERROR();
        });
        console.log(process.domain);
    }, 1000);
    // domain.exit();
});
