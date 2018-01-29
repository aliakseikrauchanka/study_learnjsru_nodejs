const User = require('models/user').User;
const HttpError = require('error').HttpError;
const ObjectID = require('mongodb').ObjectID;
const checkAuth = require('../middleware/checkAuth');

module.exports = function (app) {
    app.get('/', require('./frontpage').get);
    app.get('/frontpage', require('./frontpage').get);
    app.get('/login', require('./login').get);
    app.post('/login', require('./login').post);
    app.post('/logout', require('./logout').post);

    app.get('/chat', checkAuth, require('./chat').get);
};
