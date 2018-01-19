const fs = require('fs');
const redis = require('redis').createClient();

module.exports = (req, res) => {
    if (req.url === '/') {
        redis.on('data', /*process.domain.bind*/((err, data) => {
            // эту ошибку словит outerDomain, потому что
            // const handler = require('./handler.js');
            // делается в рамках outerDomain.run(() => {...});
            throw new Error('Redis callback');
        }));
    }
};
