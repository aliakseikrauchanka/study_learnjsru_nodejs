const User = require('models/user').User;
const HttpError = require('error').HttpError;
const ObjectID = require('mongodb').ObjectID;

exports.get = (req, res, next) => {
    res.render('frontpage');
};
