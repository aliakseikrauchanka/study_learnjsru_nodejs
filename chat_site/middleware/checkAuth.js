const HttpError = require('error').HttpError;

module.exports = (req, res, next) => {
    if (!req.session.user) {
        next(new HttpError(401, 'Not authorized'));
    }

    next();
};
