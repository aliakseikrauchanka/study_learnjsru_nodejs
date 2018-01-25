module.exports = function (req, res, next) {
    res.sendHttpError = function (err) {
        if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
            res.status(err.statusCode);
            res.json({
                message: err.message,
            });
        } else {
            res.render('error', {
                error: err,
            });
        }
    };

    next();
};
