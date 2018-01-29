exports.post = function (req, res, next) {
    var sid = req.session.id;
    var ee = req.app.get('ee');
    req.session.destroy(function (err) {
        ee.emit('session:reload', sid);

        if (err) {
            next(err);
            return;
        }

        res.redirect('/');
    });

};
