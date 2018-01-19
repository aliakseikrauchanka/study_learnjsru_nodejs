var domain = require('domain');

var ownDomain = domain.create();

ownDomain.on('error', err => {
    console.log(`Catched error: ${err.code}`);
});

ownDomain.run(() => {
    console.log(process.domain);
    ERROR();
});
