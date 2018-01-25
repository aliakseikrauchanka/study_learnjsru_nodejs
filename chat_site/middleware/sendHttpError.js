module.exports = function (req, res, next) {
    res.sendHttpError = function (err) {
        if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
            res.json(err);
        } else {
            res.render('error', {
                error: err,
            });
        }
    };

    next();
};
