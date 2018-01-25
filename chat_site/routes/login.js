const User = require('models/user').User;
const HttpError = require('error').HttpError;

exports.get = (req, res, next) => {
    res.render('login');
};

exports.post = async function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    try {
        let user = await User.findOne({ username: username });

        if (user) {
            if (!user.checkPassword(password)) {
                res.sendHttpError(new HttpError(403, 'Wrong password'));
                return;
            }
        } else {
            user = new User({
                username: username,
                password: password,
            });
            await user.save();
        }

        req.session.user = user._id;
        res.send({});
    } catch (e) {
        next(e);
    }

};
