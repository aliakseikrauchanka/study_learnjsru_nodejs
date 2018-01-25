const User = require('models/user').User;
const AuthError = require('models/user').AuthError;
const HttpError = require('error').HttpError;

exports.get = (req, res, next) => {
    res.render('login');
};

exports.post = async function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    try {
        var user = await User.authorize(username, password);
        req.session.user = user._id;
        res.send({});
    } catch (e) {
        if (e instanceof AuthError) {
            next(new HttpError(403, 'Not authorized'));
        } else {
            next(e);
        }
    }
};
