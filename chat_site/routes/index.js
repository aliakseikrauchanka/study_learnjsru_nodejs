const User = require('models/user').User;
const HttpError = require('error').HttpError;
const ObjectID = require('mongodb').ObjectID;

module.exports = function (app) {
    app.get('/', (req, res) => {
        res.render('index.ejs', {
            title: 'Express app',
            user: {
                name: 'Boris',
            },
        });
    });

    app.get('/user/:id', async function (req, res, next) {
        try {
            let objectId = new ObjectID(req.params.id);
        } catch (e) {
            next(404);
            return;
        }

        try {
            let user = await User.findById(req.params.id);
            if (!user) {
                next(new HttpError(404, 'No such user'));
                return;
            }

            res.json(user);
        } catch (e) {
            next(e);
        }
    });

    app.get('/users', async function (req, res, next) {
        try {
            let users = await User.find({});
            res.json(users);
        } catch (e) {
            next(e);
        }
    });
};
