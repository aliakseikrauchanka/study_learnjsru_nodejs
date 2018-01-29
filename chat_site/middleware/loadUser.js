const User = require('models/user').User;
const log = require('libs/log');

module.exports = async function (req, res, next) {
    try {
        res.locals.user = await User.findById(req.session.user);
    } catch (e) {
        log.error(`Was trying to load user but could not`, e);
    }

    next();
};
