exports.get = (req, res, next) => {
    res.render('chat', {
        userId: req.session.user,
    });
};
